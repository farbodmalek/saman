<template>
  <div>
    <form @submit.prevent class="row mt-2">

      <div class="col-md-4 col-sm-12 form-group">
        <label class="">نوع اقدام</label>
        <Dropdown
            @change="changeValidation($event.value)"
            :class="{'p-invalid': submitted && v$.actionTypeId.$invalid}"
            v-model="form.actionTypeId"
            filter
            empty-message="داده ای یافت نشد"
            show-clear
            class="w-100"
            :options="attachType"
            option-value="id"
            option-label="desc"/>
        <span class="font-0-7 text-red-2"
              v-if="submitted && v$.actionTypeId.$invalid">انتخاب نوع اقدام الزامی است.</span>
      </div>

      <div class="col-md-4 col-sm-12 form-group" v-if="BasePage.hasPermission(ActivitiesEnum.SetActionDate)">
        <label class="">تاریخ اقدام</label>
        <DatePicker
            :class="{'p-invalid': submitted && v$.actionDateFa.$invalid}"
            class="w-100"
            v-model="form.actionDateFa"/>
        <span class="font-0-7 text-red-2"
              v-if="submitted && v$.actionDateFa.$invalid">انتخاب تاریخ اقدام الزامی است.</span>
      </div>

      <div class="col-md-4 col-sm-12 form-group"
           v-if="form.actionTypeId === 9 && BasePage.hasPermission(ActivitiesEnum.SetActionDate)">
        <label class="">تاریخ مهلت</label>
        <DatePicker class="w-100" v-model="form.deadlineDateFa"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group" v-if="form.actionTypeId === 4 || form.actionTypeId === 19">
        <label class="">تاریخ واریز بدهی طبق اعلام مدیونین:</label>
        <DatePicker class="w-100" v-model="form.deadlineDateFa"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group" v-if="showImageUpload()">
        <label class="">نوع فایل</label>
        <Dropdown
            @change="changeValidation($event.value)"
            v-model="form.attachmentTypeID"
            filter
            empty-message="داده ای یافت نشد"
            show-clear
            class="w-100"
            :options="attachmentTypeList"
            option-value="id"
            option-label="desc"/>
        <span class="font-0-7 text-red-2" v-if="submitted && showImageUpload()">انتخاب نوع فایل الزامی است.</span>
      </div>

      <div v-if="showImageUpload()" class="mt-3">
        <Uploader @file="uploadedFile($event)" @deleteFile="deleteFile($event)" :file-format="['png' ,'jpg', 'jpeg']"/>
      </div>

      <div class="col-md-4 col-sm-12 form-group" v-if="form.actionTypeId === 2">
        <label>افزایش بدهی (بدهکار)</label>
        <Checkbox :value="true" :binary="true" v-model="form.creditor"/>

        <label>کاهش بدهی (بستانکار)</label>
        <Checkbox :value="false" :binary="true" v-model="form.creditor"/>

        <div class="">
          <label>مبلغ وصولی / هزینه</label>
          <InputNumber v-model="form.amount"/>
        </div>
      </div>

      <div class="form-group col-12" v-if="showDescriptionField()">
        <label>ملاحظات</label>
        <Textarea rows="3" v-model="form.description" autoResize/>
      </div>

      <div class="form-group col-12" v-if="form.actionTypeId === 4 || form.actionTypeId === 19">
        <label>پاسخ مدیون(وام گیرنده/ضامن)</label>
        <Textarea rows="3" v-model="form.description" autoResize/>
        <span class="font-0-7 text-red-2"
              v-if="form.actionTypeId === 4 || form.actionTypeId === 19 && !form.description">
          این فیلد الزامی است.
        </span>
      </div>

      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-success" @click="onSubmit()">ثبت</button>
        <button class="btn btn-danger me-2" @click="onReject()">انصراف</button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";
import type {ActionAttachType} from "~~/core/models/common/action-attach-type";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import DatePicker from "../../../../components/DatePicker.vue";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import {LoanActionEnum} from "~/core/models/enum/loan-action-enum";

const submitted = ref<boolean>(false);
const dialogRef = inject<any>('dialogRef');
const params = ref();
const attachType = ref<ActionAttachType[]>([]);
const attachmentTypeList = ref<ActionAttachType[]>([]);
const uploadedFiles = ref();
const attachmentDto = ref({
  fileType: null,
  fileName: null,
  attachmentTypeID: null,
  entity: {},
});
const form = reactive({
  actionTypeId: null,
  actionDateFa: null,
  creditor: false,
  amount: null,
  description: null,
  deadlineDateFa: null,
  filePaths: null,
  attachmentTypeID: null,
});
const rules = computed(() => {
  return {
    actionTypeId: {required},
    actionDateFa: {required},
  }
});
const v$ = useVuelidate(rules, form);


const getActionTypes = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getActionAttachType(), true, result => {
    if (result.results) {
      attachType.value = result.results;
    }
  });
}

const uploadedFile = (event: any) => {
  uploadedFiles.value = event;
  attachmentDto.value.entity = form;
  attachmentDto.value.fileType = uploadedFiles.value.type;
  attachmentDto.value.fileName = uploadedFiles.value.name;
  attachmentDto.value.attachmentTypeID = form.attachmentTypeID;
}

const showImageUpload = () => {
  return form.actionTypeId === LoanActionEnum.ekhtareKatbi || form.actionTypeId === LoanActionEnum.bargashteCheck ||
      form.actionTypeId === LoanActionEnum.ekhtareHosneNiat || form.actionTypeId === LoanActionEnum.ekhtareKasrAzHoghoogh ||
      form.actionTypeId === LoanActionEnum.ersaleEkhtarAzTarighePost || form.actionTypeId === LoanActionEnum.ekhtarBeManzeleZamen ||
      form.actionTypeId === LoanActionEnum.ekhtarBeManzelVamGirande || form.actionTypeId === LoanActionEnum.ersaleEkhatarBeSahebeCheck ||
      form.actionTypeId === LoanActionEnum.taahodNamePardakhtMoavaghat;
}

const showDescriptionField = () => {
  return form.actionTypeId === LoanActionEnum.beMotaghaziMohlatDadeShod || form.actionTypeId === LoanActionEnum.bargashteCheck
      || form.actionTypeId === LoanActionEnum.ersalEzharName || form.actionTypeId === LoanActionEnum.sodooreEjraeye
      || form.actionTypeId === LoanActionEnum.ersalePayamak || form.actionTypeId === LoanActionEnum.daryafteCheckejahateTasvie
      || form.actionTypeId === LoanActionEnum.taahodNamePardakhtMoavaghat || form.actionTypeId === LoanActionEnum.tamasbaniroo
      || form.actionTypeId === LoanActionEnum.tamasBaKarshenaseVosoolSetad;
}

const getFileAttachType = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getActionFileAttachType(4), false, result => {
    if (result.results) {
      attachmentTypeList.value = result.results;
    }
  });
}

const deleteFile = (index: number) => {
  // uploadedFiles.splice(index, 1);
}

const changeValidation = () => {
  return showImageUpload() && showDescriptionField();
}

const getPatchValue = () => {
  form.actionTypeId = params.value.actionTypeId;
  form.actionDateFa = params.value.actionDateFa;
  form.creditor = params.value.creditor;
  form.amount = params.value.amount;
  form.description = params.value.description;
  form.deadlineDateFa = params.value.deadlineDateFa;
  form.filePaths = params.value.filePaths;
  form.attachmentTypeID = params.value.attachmentTypeID;
}

const onSubmit = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    const formData = new FormData();
    formData.append('file', uploadedFiles.value);
    formData.append('attachmentDto', JSON.stringify(attachmentDto.value));
    formData.append('dtoName', '4');
    formData.append('loanId', params.value.loanId.toString());
    formData.append('loanActionDto', JSON.stringify(form));
    MakeResponse.makeServerResponse(LoanDocsService.setNewLoanAction(formData), true, result => {
      if (result.result) {
        dialogRef.value.close(true);
        ToastNotificationService.success('اقدام با موفقیت ثبت شد');
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید');
  }
}

const onReject = () => {
  dialogRef.value.close();
}

onMounted(() => {
  params.value = dialogRef.value.data;
  if (params.value)
    getPatchValue();
  getActionTypes();
  getFileAttachType();
})
</script>

<style scoped>

</style>