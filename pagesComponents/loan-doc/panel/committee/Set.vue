<template>
  <div class="p-3">
    <form @submit.prevent class="row">
      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">وضعیت طرح</label>
        <div class="d-flex">
          <div class="d-flex align-items-center">
            <RadioButton
                :class="{'p-invalid': submitted && v$.planActivationTypeId.$invalid}"
                v-model="committeeForm.planActivationTypeId"
                inputId="ingredient1"
                name="isActive"
                :value="1"/>
            <label for="ingredient1" class="me-2">فعال</label>
          </div>
          <div class="d-flex align-items-center">
            <RadioButton
                :class="{'p-invalid': submitted && v$.planActivationTypeId.$invalid}"
                v-model="committeeForm.planActivationTypeId"
                inputId="ingredient2"
                name="isActive"
                :value="2"/>
            <label for="ingredient2" class="me-2">غیر فعال</label>
          </div>

          <div class="d-flex align-items-center">
            <RadioButton
                :class="{'p-invalid': submitted && v$.planActivationTypeId.$invalid}"
                v-model="committeeForm.planActivationTypeId"
                inputId="ingredient3"
                name="isActive"
                :value="3"/>
            <label for="ingredient3" class="me-2">مهلت جهت انجام تعهدات</label>
          </div>
        </div>
      </div>

      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">تاریخ نظارت</label>
        <DatePicker v-model="committeeForm.surveyDateFa"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">عنوان طرح وام</label>
        <InputText v-model="committeeForm.planNoName" class="w-100"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">تعداد اشتغال تعهد شده</label>
        <InputText v-model="committeeForm.numberOfJobsObligated" class="w-100"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">تعداد اشتغال ایجاد شده</label>
        <InputText v-model="committeeForm.numberOfJobsCreated" class="w-100"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group">
        <label class="required">تعداد افراد بیمه شده</label>
        <InputText v-model="committeeForm.numberOfInsurdPerson" class="w-100"/>
      </div>

      <div class="col-md-8 col-sm-12 form-group">
        <!--      <label class="required">تعداد افراد بیمه شده</label>-->
        <Uploader @file="getUploadedFile($event)"></Uploader>
      </div>

      <div class="col-md-4 col-sm-12 d-flex align-items-center justify-content-around">
        <button class="btn btn-success w-100 justify-content-center"
                type="button"
                @click="onSubmit()">
          ذخیره
        </button>
        <button class="btn btn-danger w-100 me-2 justify-content-center"
                type="button"
                @click="onClose()">
          انصراف
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import DatePicker from "../../../../components/DatePicker.vue";
import Uploader from "../../../../components/Uploader.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";

const uploadedFile = ref<any[]>([]);
const formData = new FormData();
const dialogRef = inject('dialogRef');
const submitted = ref<boolean>(false);
const committeeForm = reactive({
  planActivationTypeId: null,
  surveyDateFa: null,
  planNoName: null,
  numberOfInsurdPerson: null,
  numberOfJobsCreated: null,
  numberOfJobsObligated: null,
  loanId: null,
});
const rules = computed(() => {
  return {
    planActivationTypeId: {required},
    surveyDateFa: {required},
    planNoName: {required},
    numberOfInsurdPerson: {required},
    numberOfJobsCreated: {required},
    numberOfJobsObligated: {required},
  }
});
const v$ = useVuelidate(rules, committeeForm);

const getUploadedFile = (selectedFile: any) => {
  uploadedFile.value.push(selectedFile);
  formData.append('file', selectedFile);
}

const onSubmit = () => {
  committeeForm.loanId = dialogRef.value.data;
  if (!v$.value.$invalid && uploadedFile.value.length > 0) {
    formData.append('outsideSurvey', JSON.stringify(committeeForm));
    MakeResponse.makeServerResponse(LoanDocsService.setOutsideSurvey(formData), true, result => {
      if (result && result.serverErrors.length === 0) {
        dialogRef.value.close(true);
        ToastNotificationService.success('ثبت اطلاعات با موفقیت انجام شد');
      }
    });
  } else {
    ToastNotificationService.error('لطفا تمامی فیلد ها به همراه آپلود فایل را کامل کنید.');
  }
}

const onClose = () => {
  dialogRef.value.close();
}

</script>

<style scoped>

</style>