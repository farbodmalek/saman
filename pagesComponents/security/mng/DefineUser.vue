<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="row">

        <div class="col-md-4 col-sm-12 form-group">
          <label for="username" class="required">نام کاربری</label>
          <InputText
              :class="{'p-invalid': submitted && v$.userName.$invalid}"
              id="username"
              v-model="userForm.userName"
              class="w-100"/>
          <small v-if="submitted && v$.userName.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label for="username" class="required">نام</label>
          <InputText
              :class="{'p-invalid': submitted && v$.firstName.$invalid}"
              id="username"
              v-model="userForm.firstName"
              class="w-100"/>
          <small v-if="submitted && v$.firstName.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label for="username" class="required">نام خانوادگی</label>
          <InputText
              id="username"
              :class="{'p-invalid': submitted && v$.lastName.$invalid}"
              v-model="userForm.lastName"
              class="w-100"/>
          <small v-if="submitted && v$.lastName.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">کلمه عبور</label>
          <InputText
              :class="{'p-invalid': submitted && v$.password.$invalid}"
              type="password"
              id="username"
              v-model="userForm.password"
              class="w-100"/>
          <small v-if="submitted && v$.password.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">تکرار کلمه عبور</label>
          <InputText
              :class="{'p-invalid': submitted && v$.rePassword.$invalid}"
              type="password"
              id="username"
              v-model="userForm.rePassword"
              class="w-100"/>
          <small v-if="submitted && v$.rePassword.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی
            است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">کد ملی</label>
          <InputText
              :class="{'p-invalid': submitted && v$.nationalCode.$invalid}"
              id="username"
              v-model="userForm.nationalCode"
              class="w-100"/>
          <small v-if="submitted && v$.nationalCode.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی
            است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">تلفن ثابت</label>
          <InputText
              id="username"
              :class="{'p-invalid': submitted && v$.telNumber.$invalid}"
              v-model="userForm.telNumber"
              class="w-100"/>
          <small v-if="submitted && v$.telNumber.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">تلفن همراه</label>
          <InputText
              id="username"
              :class="{'p-invalid': submitted && v$.mobileNumber.$invalid}"
              v-model="userForm.mobileNumber"
              class="w-100"/>
          <small v-if="submitted && v$.mobileNumber.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی
            است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">سرپرستی</label>
          <MultiSelect
              filter
              :class="{'p-invalid': submitted && v$.supervisorsList.$invalid}"
              display="chip"
              @filter="getSupervisors($event.value)"
              @change="getBranches(userForm.supervisorsList)"
              v-model="userForm.supervisorsList"
              :options="supervisorList"
              optionLabel="supervisorName"
              option-value="supervisorCode"
              placeholder="سرپرستی را انتخاب کنید"
              :maxSelectedLabels="3"
              class="w-100"/>
          <small v-if="submitted && v$.supervisorsList.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی
            است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">شعبه</label>
          <MultiSelect
              filter
              display="chip"
              @filter="getBranches(userForm.supervisorsList, $event.value)"
              v-model="userForm.branchcodes"
              :options="branchList"
              :class="{'p-invalid': submitted && v$.branchcodes.$invalid}"
              optionLabel="branchName"
              empty-message="داده ای یافت نشد"
              option-value="branchCode"
              placeholder="شعبه را انتخاب کنید"
              :maxSelectedLabels="3"
              class="w-100"/>
          <small v-if="submitted && v$.branchcodes.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی
            است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">عنوان نقش</label>
          <Dropdown
              :class="{'p-invalid': submitted && v$.branchcodes.$invalid}"
              v-model="userForm.roleId"
              :options="userRoles"
              option-value="id"
              :show-clear="true"
              optionLabel="roleDesc"
              class="w-100"
              placeholder="نقش را انتخاب کنید"/>
          <small v-if="submitted && v$.branchcodes.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">وضعیت کاربر</label>
          <div class="d-flex">
            <div class="d-flex align-items-center">
              <RadioButton
                  :class="{'p-invalid': submitted && v$.isActive.$invalid}"
                  v-model="userForm.isActive"
                  inputId="ingredient1"
                  name="isActive"
                  :value="true"/>
              <label for="ingredient1" class="me-2">فعال</label>
            </div>
            <div class="d-flex align-items-center">
              <RadioButton
                  :class="{'p-invalid': submitted && v$.isActive.$invalid}"
                  v-model="userForm.isActive"
                  inputId="ingredient2"
                  name="isActive"
                  :value="false"/>
              <label for="ingredient2" class="me-2">غیر فعال</label>
            </div>
          </div>
          <small v-if="submitted && v$.isActive.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">تاریخ شروع به کار</label>
          <InputText
              id="username"
              :class="{'p-invalid': submitted && v$.startEmploymentDateFa.$invalid}"
              v-model="userForm.startEmploymentDateFa"
              class="w-100"/>
          <small v-if="submitted && v$.startEmploymentDateFa.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required">تاریخ پایان همکاری</label>
          <InputText
              :class="{'p-invalid': submitted && v$.endEmploymentDateFa.$invalid}"
              id="username"
              v-model="userForm.endEmploymentDateFa"
              class="w-100"/>
          <small v-if="submitted && v$.endEmploymentDateFa.$invalid" class="text-danger fs-7">پر کردن این فیلد الزامی است.</small>
        </div>

        <div class="col-md-4 col-sm-12 mt-2 d-flex justify-content-end align-items-end">
          <button class="btn btn-success fw-normal mb-0">ثبت کاربر</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {MakeResponse} from "~/composables/make-response";
import {CommonService} from "~/services/common-service";
import {ManagementService} from "~/services/management-service";
import {required} from "@vuelidate/validators";
import {useVuelidate} from '@vuelidate/core';
import {ToastNotificationService} from "~/core/toast-notification-service";

const supervisorList = ref([]);
const branchList = ref([]);
const userRoles = ref([]);
const submitted = ref(false);
const dialogRef = inject('dialogRef');
const userForm = reactive({
  userName: null,
  firstName: null,
  lastName: null,
  password: null,
  rePassword: null,
  nationalCode: null,
  telNumber: null,
  mobileNumber: null,
  supervisorsList: null,
  branchcodes: null,
  roleId: null,
  isActive: null,
  startEmploymentDateFa: null,
  endEmploymentDateFa: null,
});

const rules = computed(() => {
  return {
    userName: {required},
    firstName: {required},
    lastName: {required},
    password: {required},
    rePassword: {required},
    nationalCode: {required},
    telNumber: {required},
    mobileNumber: {required},
    supervisorsList: {required},
    branchcodes: {required},
    roleId: {required},
    isActive: {required},
    startEmploymentDateFa: {required},
    endEmploymentDateFa: {required},
  };
});

const v$ = useVuelidate(rules, userForm);

const getPatchValue = (data: any) => {
  if (data) {
    userForm.userName = data.userName;
    userForm.firstName = data.firstName;
    userForm.lastName = data.lastName;
    userForm.password = data.password;
    userForm.rePassword = data.rePassword;
    userForm.nationalCode = data.nationalCode;
    userForm.telNumber = data.telNumber;
    userForm.mobileNumber = data.mobileNumber;
    userForm.supervisorsList = data.supervisorCode.split(',').map((p: any) => +p);
    userForm.branchcodes = data.branchIds.split(',').map((p: any) => +p);
    userForm.roleId = data.roleId;
    userForm.isActive = data.isActive;
    userForm.startEmploymentDateFa = data.startEmploymentDateFa;
    userForm.endEmploymentDateFa = data.endEmploymentDateFa;
  }
}

const getSupervisors = (supervisorName: string = '') => {
  const body = {
    pageNumber: 1,
    supervisorName: supervisorName
  }
  MakeResponse.makeServerResponse(CommonService.getSuperVisor(body), true, result => {
    if (result.results) {
      supervisorList.value = result.results;
    }
  });
}

const getBranches = (supervisorList: number[] = [], branchName: string = '') => {
  const body = {
    pageNumber: 1,
    branchName: branchName,
    supervisorList: supervisorList
  }
  MakeResponse.makeServerResponse(CommonService.getBranches(body), true, result => {
    if (result.results) {
      branchList.value = result.results;
    }
  });
}

const getUserRoles = () => {
  MakeResponse.makeServerResponse(CommonService.getAllUserRoles(), true, result => {
    if (result.results) {
      userRoles.value = result.results;
    }
  });
}

const onSubmit = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(ManagementService.setNewUserDefinition(userForm), true, result => {
      if (result.result) {
        ToastNotificationService.success('ثبت کاربر جدید با موفقیت انجام شد');
        dialogRef.value.close(true);
      } else {
        ToastNotificationService.error(result.serverError[0].hint);
      }
    });
  } else {
    ToastNotificationService.error('فیلد های الزامی را تکمیل کنید');
  }
}

onMounted(() => {
  const params = dialogRef.value.data;
  getUserRoles();
  if (params) {
    getSupervisors(params.supervisorName);
    getBranches(params.supervisorCode.split(',').map((p: any) => +p), '');
    getPatchValue(params);
  } else {
    getSupervisors();
  }
});
</script>

<style scoped>

</style>