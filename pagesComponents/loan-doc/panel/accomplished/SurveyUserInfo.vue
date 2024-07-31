<template>
  <div class="row align-items-center p-3" v-if="params">

    <div class="col-md-6 col-sm-12 p-2">
      <img
          alt="userImage"
          v-if="params.userImagePath !== null && params.userImagePath !== '' "
          :src="BasePage.getEnv() + params.userImagePath"/>
      <img alt="userImage"
           class="rounded-circle"
           v-if="params.userImagePath === null || params.userImagePath === '' "
           src="/img/public-img/no-image.jpg"/>

      <div class="mt-4 d-flex">
        <p class="mb-0">{{ params.firstName }}</p> &nbsp;
        <p class="me-1 mb-0">{{ params.lastName }}</p>
        <p class="me-2 text-purple-1 mb-0">({{ params?.roleDesc }})</p>
      </div>
    </div>
  </div>

  <div class="row mt-3 p-2">
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">تلفن همراه: {{params?.mobileNumber }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2 d-flex">
      تلفن محل سکونت:
      <pre class="mb-0 me-3">{{ params?.telNumber }}</pre>
    </div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">پست الکترونیک: {{ params?.email }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">جنسیت: {{ params?.genderName }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">تاریخ تولد: {{ params?.birthDateFa }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">کد ملی: {{ params?.nationalCode }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">شهر: {{ params?.city }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">کد پستی: {{ params?.postalCode }}</div>
    <div class="col-md-4 col-sm-12 p-2 font-0-9 border border-1 rounded-2">آدرس: {{ params?.address }}</div>
  </div>
</template>

<script lang="ts" setup>
import {BasePage} from "~/core/base/base-page";

const dialogRef = inject<any>('dialogRef');
const params = ref();

onMounted(() => {
  params.value = dialogRef.value.data;
  console.log(params.value)
})
</script>

<style scoped>

</style>