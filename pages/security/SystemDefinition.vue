<template>
  <div class="container-child">
    <form @submit.prevent>
      <div class="row">

        <div class="col-md-4 col-sm-12 form-group">
          <label>مهلت ارسال درخواست چاپ</label>
          <InputNumber
              v-model="defineSystemForm.paymentMonthDeadline"
              class="w-100"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>مهلت نیروی حق السعی</label>
          <InputNumber
              v-model="defineSystemForm.actorExpireDeadline"
              class="w-100"/>
        </div>

        <div class="col-md-2 col-sm-12 form-group d-flex align-items-end">
          <button class="btn btn-success fw-normal w-100 mb-1" @click="setSystemConfig()">
            <span>ثبت تنظیمات</span>
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {MakeResponse} from "~/composables/make-response";
import {ManagementService} from "~/services/management-service";
import {ToastNotificationService} from "~/core/toast-notification-service";

const defineSystemForm = ref({
  paymentMonthDeadline: null,
  actorExpireDeadline: null,
  id: null
});

const getDefinition = () => {
  MakeResponse.makeServerResponse(ManagementService.getSystemDefinition(), true, result => {
    if (result.result) {
      defineSystemForm.value.id = result.result.id;
      defineSystemForm.value.actorExpireDeadline = result.result.actorExpireDeadline;
      defineSystemForm.value.paymentMonthDeadline = result.result.paymentMonthDeadline;
    }
  });
}

const setSystemConfig = () => {
  MakeResponse.makeServerResponse(ManagementService.setSystemDefinition(defineSystemForm.value), true, result => {
    if (result.result) {
      ToastNotificationService.success('ثبت تنظیمات با موفقیت انجام شد');
      getDefinition();
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint);
    }
  });
}

onMounted(() => {
  getDefinition();
});

</script>

<style scoped>

</style>