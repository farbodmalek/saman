<template>
  <div class="">
    <TableContainer
        :has-check-box="true"
        :has-header="true"
        @checked="checked($event)"
        @changePage="paging($event)"
        :take="take"
        :hasPagination="false"
        :pageNumber="pageNumber"
        :listData="wageList"
        :totalRows="totalRows"
        :columns="columns">
      <template #header>
       <div class="d-flex justify-content-between align-items-center">
         <p class="mb-0">لیست حق الزحمه</p>
         <button class="btn btn-info mb-0"
                 @click="onPayMonthly($event)"
                 v-if="basePage.hasPermission(ActivitiesEnum.ConfirmUsersMontlyPayment) && showAcceptPayWage">
           تایید پرداخت حق السعی
         </button>
       </div>
      </template>
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../components/tabel/TableContainer.vue";
import {SurveyService} from "~/services/survey-service";
import type {Wage} from "~~/core/models/management/wage";
import {BasePage} from "~/core/base/base-page";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useConfirm} from "primevue/useconfirm";
import {MakeResponse} from "~/composables/make-response";

const basePage = BasePage;
const wageList = ref<Wage[]>([]);
const totalRows = ref(0);
const take = ref(10);
const pageNumber = ref(1);
const selectedItems = ref<number[]>([]);
const showAcceptPayWage = ref<boolean>(false);
const confirm = useConfirm();
const columns = ref([
  {
    header: 'تاریخ',
    field: 'wageDateFa'
  },
  {
    header: 'کارشناس',
    field: 'surveyUserFullName',
  },
  {
    header: 'منطقه',
    field: 'supervisor',
  },
  {
    header: 'شعبه',
    field: 'branch',
  },
  {
    header: 'مبلغ',
    field: 'wageAmount',
    isCurrency: true
  },
  {
    header: 'تعداد نظارت',
    field: 'pointCount',
  },
  {
    header: 'تعداد نظارت (زیر ده کیلومتر)',
    field: 'shortDistancePointCount',
  },
  {
    header: 'مسافت (بالای ده کیلومتر)',
    field: 'strLongDistance',
  },
]);
const filter = ref({
  pageNumber: pageNumber.value
});

const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  // filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getWage();
}

const getWage = () => {
  MakeResponse.makeServerResponse(SurveyService.getSurveyWageList(filter.value), true, result => {
    if (result.results) {
      wageList.value = result.results.map((p: any) => {
        return {
          ...p,
        }
      });
      totalRows.value = result.totalRows;
    }
  });
}


const checked = (data: Wage[]) => {
  if (data && data.length > 0) {
    selectedItems.value = data.map(p => p.id);
    showAcceptPayWage.value = f;
  } else
    showAcceptPayWage.value = false;
}

onMounted(() => {
  getWage();
})
</script>

<style scoped>

</style>