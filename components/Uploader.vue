<template>
<div>
  <FileUpload name="postedFiles"
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
              @select="onSelectedFiles">

    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
      <Button @click="chooseCallback()" icon="pi pi-images" class="rounded-circle" rounded outlined></Button>
    </template>

    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
      <div v-if="files.length > 0">
        <div class="row overflow-auto flex-nowrap">
          <div v-for="(file, index) of files"
               :key="file.name + file.type + file.size"
               class="card m-0 p-3 col-6 border-1 surface-border align-items-center gap-3">
            <div>
              <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="100" />
            </div>
            <div>{{ formatSize(file.size) }}</div>
            <Button icon="pi pi-times"
                    @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
          </div>
        </div>
      </div>
    </template>

    <template #empty>
      <div class="d-flex align-items-center justify-content-center">
        <p class="my-2 mb-0">فایل های مورد نظر خود را آپلود کنید</p>
      </div>
    </template>
  </FileUpload>
</div>
</template>

<script lang="ts" setup>
import { usePrimeVue } from 'primevue/config';
import {ToastNotificationService} from "~/core/toast-notification-service";

const emit = defineEmits(['file', 'deleteFile']);
const props = defineProps({
  fileFormat: {
    type: Array,
    default: []
  }
});
const $primevue = usePrimeVue();
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file: any, removeFileCallback: any, index: number) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
  emit('deleteFile', index);
};

const onSelectedFiles = (event: any) => {
  // console.log(event)
  // if (event.files[event.files.length - 1].type.split('/').includes(props.fileFormat)) {
    files.value = event.files;
    files.value.forEach((file: any) => {
      totalSize.value += parseInt(formatSize(file.size));
    });
    emit('file', files.value[files.value.length - 1]);
  // } else {
  //   ToastNotificationService.error(`فرمت فایل انتخابی صحیح نیست. فرمت های قابل قبول: ${props.fileFormat?.join(', ')}`);
  // }
};

const formatSize = (bytes: number) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;
  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedSize} ${sizes[i]}`;
};
</script>

<style scoped>

</style>