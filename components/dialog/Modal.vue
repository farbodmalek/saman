<template>
  <div>
    <Dialog
        :visible="visible"
        :header="header"
        modal
        :style="{width: '50vw'}"
        :draggable="false">
      <slot/>

      <template v-if="hasFooter">
        <div class="w-100 d-flex justify-content-end mt-3">
          <Button
              severity="success" raised
              @click="onSaveData($event)"
              class="rounded-2 border-0 p-2">
            <span>تائید</span>
            <i class="fa fa-check me-4"></i>
          </Button>
          <Button
              severity="danger" raised
              @click="onClose($event)"
              type="button"
              class="me-3 rounded-2 border-0 p-2">
            <span>انصراف</span>
            <i class="fa fa-times me-3"></i>
          </Button>
        </div>
      </template>

    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  hasFooter: {
    type: Boolean,
    default: true
  },
  header: {
    type: String,
    default: ''
  },
});

const emit = defineEmits(['close', 'save'])

const onClose = (event: any) => {
  console.log(event)
  emit('close', event);
}

const onSaveData = (event: any) => {
  emit('save', event);
}
</script>

<style scoped>

</style>