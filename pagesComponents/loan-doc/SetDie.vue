<template>
<div>
  <form @submit.prevent class="mt-4 row align-items-end">
    <div class="form-group col-md-2 col-sm-12 d-flex align-items-center">
      <label for="isDie" class="mb-0">فوتی</label>
        <Checkbox input-id="isDie" v-model="isDie" :binary="true"/>
    </div>

    <div v-if="isDie" class="form-group col-md-6 col-sm-12">
      <label>بیمه مورد نظر را انتخاب کنید</label>
      <Dropdown
          class="w-100"
          show-clear
          :options="insuranceList"
          v-model="insuranceCode"
          option-value="id"
          option-label="name"/>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-success" @click="onSubmit()">ثبت</button>
      <button class="btn btn-danger me-3" @click="reject()">انصراف</button>
    </div>
  </form>
</div>
</template>

<script setup lang="ts">
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";

const isDie = ref<boolean>(false);
const insuranceCode = ref<number>(0);
const dialogRef = inject('dialogRef');
const params = ref();
const insuranceList = ref<any[]>([]);


const getInsuranceList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getInsuranceTypes({}), true, result => {
    if (result.result) {
      insuranceList.value = result.result.results;
    }
  });
}

const onSubmit = () => {
  const body = {
    customerNumber: params.value.customerNumber,
    supplementaryInsuranceId: params.value.insuranceCode,
    isDeath: !isDie
  }

  if ((isDie.value && insuranceCode.value) || !isDie.value ) {
    if (body.isDeath)
      body.supplementaryInsuranceId = 1;
    MakeResponse.makeServerResponse(LoanDocsService.setLoanDeath(body), true, result => {
      if (result.result) {
        ToastNotificationService.success('فوتی با منوفقیت ثبت شد');
        reject(true);
      }
    })
  }
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  params.value = dialogRef.value.data;
  isDie.value = params.value.isDeath;
  insuranceCode.value = params.value.suppInsuranceTypeId;
  getInsuranceList();
});
</script>

<style scoped>

</style>