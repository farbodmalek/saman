<template>
  <div class="row">

    <div class="col-12 my-2">
      <p>فایل های ضمیمه</p>

      <div>
        <img v-for="(img, index) of params?.surveyImageListModel" :key="index"
             :src="'https://samenfiles.karafariniomid.com/api/'+ img.imagePath" alt="servuy-img" class="w-100" />
      </div>
    </div>

    <div class="col-12 col-md-6 mt-2" v-if="params?.cartableSurveyDetailListModel.id > 0">
      <TableTwoRow title="اطلاعات نظارت" :data-table="surveyInfo"/>
    </div>

    <div class="col-12 col-md-6 mt-2" v-if="params?.industrialSurveyModel.id > 0">
      <TableTwoRow title="صنعتی" :data-table="industrialInfo"/>
    </div>

    <div class="col-12 col-md-6 mt-2" v-if="params?.planLivestockSurveyModel.id > 0">
      <TableTwoRow title="کشاورزی (دامداری و دامپروری)" :data-table="farming"/>
    </div>

    <div class="col-12 col-md-6 mt-2" v-if="params?.planServiceSurveyModel.id > 0">
      <TableTwoRow title="خدمات" :data-table="planServices"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableTwoRow from "../../../../components/tabel/TableTwoRow.vue";

const dialogRef = inject<any>('dialogRef');
const params = ref();
const surveyInfo = ref();
const industrialInfo = ref();
const farming = ref();
const planServices = ref();


const getSurveyInfo = () => {
  surveyInfo.value = [
    {
      label: 'کاربر ارجاع دهنده',
      value: params.value.cartableSurveyDetailListModel.referenceUserName
    },
    {
      label: 'کارشناس ناظر',
      value: params.value.cartableSurveyDetailListModel.surveyUserName
    },
    {
      label: 'تاریخ ارجاع برای نظارت',
      value: params.value.cartableSurveyDetailListModel.referenceDateFa
    },
    {
      label: 'زمان ثبت نظارت توسط کارشناس',
      value: params.value.cartableSurveyDetailListModel.surveyDateFa
    },
    {
      label: 'بخش پرداخت تسهیلات',
      value: params.value.cartableSurveyDetailListModel.facilitiesPart
    },
    {
      label: 'درخواست تغییر محل طرح وام',
      value: params.value.cartableSurveyDetailListModel.facilitiesPart
    },
  ];
};

const getIndustrialInfo = () => {
  industrialInfo.value = [
    {
      label: 'مجوز کار',
      value: params.value.industrialSurveyModel.hasWorkPermission ? 'دارد' : 'ندارد'
    },
    {
      label: 'نوع مالکیت',
      value: params.value.industrialSurveyModel.ownerTypeDesc
    },
    {
      label: 'لیست بیمه',
      value: params.value.industrialSurveyModel.numberOfInsurdPerson > 0 ? 'دارد' : 'ندارد'
    },
    {
      label: 'اشتغال ایجاد شده',
      value: params.value.industrialSurveyModel.numberOfJobsCreated
    },
    {
      label: 'افراد بیمه شده',
      value: params.value.industrialSurveyModel.numberOfInsurdPerson
    },
    {
      label: 'حضور وام گیرنده در محل کسب',
      value: params.value.industrialSurveyModel.presenceTypeName
    },
    {
      label: 'لیست تجهیزات',
      value: params.value.industrialSurveyModel.equipmentDescription
    },
    {
      label: 'گزارش همیار نظارت و وصول مطالبات/ناظر',
      value: params.value.industrialSurveyModel.surveyReport
    },
  ];
};

const getFarmingInfo = () => {
  farming.value = [
    {
      label: 'دفترچه دامداری',
      value: params.value.planLivestockSurveyModel.livestockBookletDesc
    },
    {
      label: 'پروانه دامداری',
      value: params.value.planLivestockSurveyModel.livestockLicenseDesc
    },
    {
      label: 'بیمه نامه دام',
      value: params.value.planLivestockSurveyModel.livestockInsuranceDesc
    },
    {
      label: 'تاریخ بیمه نامه',
      value: params.value.planLivestockSurveyModel.insuranceDateFa
    },
    {
      label: 'تعداد دام بیمه شده',
      value: params.value.planLivestockSurveyModel.numberOfInsuredLivestock
    },
    {
      label: 'اشتغال ایجاد شده',
      value: params.value.planLivestockSurveyModel.numberOfJobsCreated
    },
    {
      label: 'افراد بیمه شده',
      value: params.value.planLivestockSurveyModel.numberOfInsurdPerson
    },
    {
      label: 'تعداد کل دام',
      value: params.value.planLivestockSurveyModel.numberOfTotalLivestock
    },
    {
      label: 'نوع دام',
      value: params.value.planLivestockSurveyModel.livestockTypeDesc
    },
    {
      label: 'گزارش همیار نظارت و وصول مطالبات/ناظر',
      value: params.value.planLivestockSurveyModel.surveyReport
    },
  ];
  if (params.value.planLivestockSurveyModel.livestockTypeId === 1) {
    farming.value.splice(0, 0, {
      label: 'تعداد',
      value: params.value.planLivestockSurveyModel.livestockTypeDesc + ' - ' + params.value.planLivestockSurveyModel.numberOfMaleLivestock
    }, {
      label: 'تعداد',
      value: params.value.planLivestockSurveyModel.livestockTypeDesc + ' - ' + params.value.planLivestockSurveyModel.numberOfFemaleLivestock
    })
  }

//   تاریخ آخرین مایه کوبی
};

const getPlanServices = () => {
  planServices.value = [
    {
      label: 'مجوز کار',
      value: params.value.planServiceSurveyModel.hasWorkPermissionDesc
    },
    {
      label: 'نوع مالکیت',
      value: params.value.planServiceSurveyModel.ownerTypeDesc
    },
    {
      label: 'لیست بیمه',
      value: params.value.planServiceSurveyModel.haseInsuranceList
    },
    {
      label: 'اشتغال ایجاد شده',
      value: params.value.planServiceSurveyModel.numberOfJobsCreated
    },
    {
      label: 'افراد بیمه شده',
      value: params.value.planServiceSurveyModel.numberOfInsurdPerson
    },
    {
      label: 'حضور وام گیرنده در محل کسب',
      value: params.value.planServiceSurveyModel.presenceTypeName
    },
    {
      label: 'لیست تجهیزات',
      value: params.value.planServiceSurveyModel.equipmentDescription
    },
    {
      label: 'گزارش همیار نظارت و وصول مطالبات/ناظر',
      value: params.value.planServiceSurveyModel.surveyReport
    },
  ];
};

onMounted(() => {
  params.value = dialogRef.value.data;
  getSurveyInfo();
  getIndustrialInfo();
  getFarmingInfo();
  getPlanServices();
});
</script>

<style scoped>

</style>