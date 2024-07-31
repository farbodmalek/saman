<template>
  <div>
    <form @submit.prevent>
      <div class="form-group mt-3">
        <label>عنوان رشته فعالیت</label>
        <Dropdown
            @change="onGetActivities($event.value)"
            @filter="getPlanNo($event.value)"
            v-model="planId"
            :options="selectedPlanList"
            filter
            option-value="id"
            optionLabel="name"
            placeholder="انتخاب کنید"
            class="w-100">
        </Dropdown>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-success w-25 mt-3" type="button" @click="setPlanNo()">ثبت</button>
        <button class="btn btn-danger me-3 w-25 mt-3" @click="reject()">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {MakeResponse} from "~/composables/make-response";
import {SurveyService} from "~/services/survey-service";
import {ToastNotificationService} from "~/core/toast-notification-service";

const dialogRef = inject('dialogRef');
const params = ref();
const selectedPlanList = ref<any[]>([]);
const filter = ref({
  name: '',
  pageNumber: 1
});
const planId = ref<number>(0);

const getPlanNo = (name: string) => {
  filter.value.name = name;
  filter.value.pageNumber = 1;
  MakeResponse.makeServerResponse(SurveyService.getPlanNoList(filter.value), true, result => {
    if (result.results) {
      selectedPlanList.value = result.results;
    }
  });
}

const setPlanNo = () => {
  const body = {
    currentPlanNoId: params.value.planNoId,
    newPlanNoId: planId.value
  }
  MakeResponse.makeServerResponse(SurveyService.changeLoanPlanNo(body), true, result => {
    if (result.result) {
      ToastNotificationService.success('ثبت با موفقیت انجام شد');
      reject(true);
    }
  });
}

const onGetActivities = (data: any) => {
  if (data && data === params.value.planNoId) {
    ToastNotificationService.warn('عنوان رشته جدید تکراری می باشد');
  }
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  params.value = dialogRef.value.data;
  getPlanNo('');
})
</script>

<style scoped>

</style>