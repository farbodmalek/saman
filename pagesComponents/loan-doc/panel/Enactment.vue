<template>
  <div>
    <form @submit.prevent>
      <div class="row">

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">دوران ساخت و ساز(ماه)</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.constructionPeriod.$invalid}"
              v-model="enactmentForm.constructionPeriod" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">دوران تنفس(ماه)</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.gracePeriod.$invalid}"
              v-model="enactmentForm.gracePeriod" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">تاریخ تصویب طرح</label>
          <date-picker
              :class="{'p-invalid': submitted && v$.planApprovedDateFa.$invalid}"
              v-model="enactmentForm.planApprovedDateFa" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">مجموع دوره بازپرداخت</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.totalRefundPeriod.$invalid}"
              v-model="enactmentForm.totalRefundPeriod" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">تعداد اشتغال موجود</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.currentJobCount.$invalid}"
              v-model="enactmentForm.currentJobCount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">تعداد اشتغال ایجادی</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.createdJobCount.$invalid}"
              v-model="enactmentForm.createdJobCount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">نوع تسهیلات</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.loanTypeId.$invalid}"
              v-model="enactmentForm.loanTypeId" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">مبلغ جهت احداث مکان اجرای طرح</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.createPlaceAmount.$invalid}"
              v-model="enactmentForm.createPlaceAmount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">مبلغ جهت خرید تجهیزات</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.equipmentAmount.$invalid}"
              v-model="enactmentForm.equipmentAmount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">مبلغ سرمایه در گردش</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.fundAmount.$invalid}"
              v-model="enactmentForm.fundAmount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <label class="required">آورده متقاضی</label>
          <InputNumber
              :class="{'p-invalid': submitted && v$.customerAmount.$invalid}"
              v-model="enactmentForm.customerAmount" class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 form-group">
          <Uploader @file="getUploadedFile($event)"></Uploader>
        </div>

        <div class="col-md-1 col-sm-12">
          <button class="btn btn-primary w-100" type="button" @click="getReport()">ذخیره</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import Uploader from "../../../components/Uploader.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});
const enactmentForm = reactive({
  constructionPeriod: null,
  gracePeriod: null,
  planApprovedDateFa: null,
  totalRefundPeriod: 60,
  currentJobCount: null,
  createdJobCount: null,
  loanTypeId: null,
  createPlaceAmount: null,
  equipmentAmount: null,
  fundAmount: null,
  customerAmount: null,
  loanId: null,
});
const rules = computed(() => {
  return {
    gracePeriod: {required},
    constructionPeriod: {required},
    planApprovedDateFa: {required},
    totalRefundPeriod: {required},
    currentJobCount: {required},
    createdJobCount: {required},
    loanTypeId: {required},
    createPlaceAmount: {required},
    equipmentAmount: {required},
    fundAmount: {required},
    customerAmount: {required},
  }
});
const v$ = useVuelidate(rules, enactmentForm);
const file = ref();
const submitted = ref<boolean>(false);

const getUploadedFile = (selectedFile: any) => {
  file.value = selectedFile;
}

const getReport = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    const formData = new FormData();
    formData.append('enactment', JSON.stringify(enactmentForm));
    formData.append('file', file.value);
    MakeResponse.makeServerResponse(LoanDocsService.setEnactment(formData), true, result => {
      if (result) {
        console.log(result)
      }
    });
  }
}
</script>

<style scoped>

</style>