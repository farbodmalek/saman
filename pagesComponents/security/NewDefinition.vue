<template>
  <div class="mt-2">
    <form @submit.prevent>
      <div class="row">

        <div class="col-md-4 col-sm-12 form-group">
          <label>عنوان والد</label>
          <Dropdown
              filter
              show-clear
              v-model="form.parentId"
              :options="menuList"
              optionLabel="title"
              option-value="code"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>کد مرتب سازی</label>
          <InputNumber
              v-model="form.order"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>کد منو</label>
          <InputNumber
              v-model="form.code"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>نام</label>
          <InputText
              v-model="form.name"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>عنوان</label>
          <InputText
              v-model="form.title"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>مسیر</label>
          <InputText
              v-model="form.path"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>آیکون</label>
          <InputText
              v-model="form.iconClass"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group mb-0 d-flex align-items-center">

          <label class=" d-flex align-items-center">
            <Checkbox
                :binary="true"
                v-model="form.isActive"
                class="w-100"/>
            <span class="me-2">فعال</span>
          </label>
        </div>

        <div class="col-12 form-group">
          <label>شرح</label>
          <Textarea
              v-model="form.description"
              class="w-100"/>
        </div>

        <div class="d-flex justify-content-end">
          <button class="btn btn-success" type="button" @click="onSubmit()">
            ثبت دسترسی
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ManagementService} from "~/services/management-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

const dialogRef = inject('dialogRef');
const menuList = ref();
const form = reactive({
  parentId: null,
  order: null,
  code: null,
  name: null,
  title: null,
  path: null,
  iconClass: null,
  description: null,
  isActive: false,
  id: 0,
  isMenu: null,
});

const getPatchValue = (data: any) => {
  if (data) {
    form.id = data.id;
    form.parentId = data.code;
    form.order = data.order;
    form.code = data.code;
    form.name = data.name;
    form.title = data.title;
    form.path = data.path;
    form.iconClass = data.iconClass;
    form.description = data.description;
    form.isActive = data.isActive;
    form.isMenu = data.isMenu;
    console.log(form)
  }
}

const getMenu = () => {
  const filter = {
    take: 200,
    pageNumber: 1,
    isMenu: true
  }
  MakeResponse.makeServerResponse(ManagementService.getMenuDefinition(filter), true, result => {
    if (result.results) {
      menuList.value = result.results;
    }
  });
}

const onSubmit = () => {
  MakeResponse.makeServerResponse(ManagementService.setUserActivity(form), true, result => {
    if (result.result) {
      ToastNotificationService.success('تعریف دسترسی با موفقیت انجام شد');
      dialogRef.value.close(true);
    } else {
      ToastNotificationService.error(result.serverError[0].hint);
    }
  });
}

onMounted(() => {
  const params = dialogRef.value.data;
  getMenu();
  if (params) {
    getPatchValue(params);
  }
});

</script>

<style scoped>

</style>