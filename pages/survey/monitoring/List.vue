<template>
  <div class="">
    <MultiHeader
        @action="getRowAction($event)"
        @changePage="paging($event)"
        :take="take"
        :has-header="true"
        :pageNumber="pageNumber"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns">
      <template #header>
        <div class="d-flex justify-content-end">
          <span @click="downloadExcel()"><i class="pi pi-file-excel text-green-1 cursor-pointer"></i></span>
        </div>
      </template>
    </MultiHeader>
  </div>
</template>

<script lang="ts" setup>
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import {SurveyService} from "~/services/survey-service";
import MultiHeader from "../../../components/tabel/MultiHeader.vue";
import SetPlanNo from "../../../pagesComponents/survey/SetPlanNo.vue";
import {useConfirm} from "primevue/useconfirm";
import {ToastNotificationService} from "~/core/toast-notification-service";

const route = useRoute();
const columns = ref([
  {
    header1: 'شماره',
    field1: 'customerNumber',
    format1: 'action',
    header2: 'نوع قسط',
    field2: 'installmentType',
  },
  {
    header1: 'شماره قرارداد',
    field1: 'loanNumber',
    header2: 'تاریخ قرارداد',
    field2: 'registerDate',
  },
  {
    header1: 'وام گیرنده',
    field1: 'customerName',
    header2: 'ناظر',
    field2: 'userFullName',
  },
  {
    header1: 'سرپرستی',
    field1: 'supervisorName',
    header2: 'شعبه',
    field2: 'branchName',
  },
  {
    header1: 'مبلغ وام',
    field1: 'loanAmount',
    isCurrency1: true,
    header2: 'تعداد اقساط/معوق',
    field2: 'loanDebtDelay',
  },
  {
    header1: 'تاریخ آخرین ارجاع',
    field1: 'lastReferenceDateFa',
    header2: 'تاریخ آخرین نظارت',
    field2: 'lastSurveyDateFa',
  },
  {
    header1: 'مرحله نظارت',
    field1: 'surveyLevel',
    header2: 'تعداد ارجاع / انجام شده',
    field2: 'referenceCount',
  },
  {
    header1: 'آخرین وضعیت',
    field1: 'lastLoanStatusDesc',
    header2: 'آخرین اقدام',
    field2: 'lastAction',
  },
  {
    header2: 'عنوان رشته فعالیت',
    field2: 'planNoName',
    header1: '',
    field1: '',
  },
]);
const filter = ref({
  take: 10,
  pageNumber: 1,
  surveyListType: 1,
  branches: []
});
const usersList = ref();
const totalRows = ref(0);
const take = ref(10);
const pageNumber = ref(1);
const router = useRouter();
const dialog = useDialog();
const confirm = useConfirm();


const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getSurvey();
}

const getSurvey = () => {
  MakeResponse.makeServerResponse(SurveyService.getSurveyList(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          referenceCount: p.surveyCount + '/' + p.cartableCount,
          loanDebtDelay: p.delayedInstallmentCount + '/' + p.installmentCount,
          userFullName: filter.value.surveyListType && filter.value.surveyListType !== 1 && filter.value.surveyListType !== 3 ? p.userFullName : ''
        }
      });
      totalRows.value = result.totalRows;
      usersList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const getRowAction = (row: any) => {
  router.push({path: `/loan/${row.data.customerNumber}`, query: {title: 'total'}});
}

const columnActions = (index: number) => {
  usersList.value[index].columnActions = [
    {
      id: 1,
      title: 'افزودن عنوان رشته فعالیت',
      piIcon: 'pi pi-slack',
      style: 'text-primary',
      onClick(row: any) {
        addPlan(row);
      }
    },
    {
      id: 2,
      title: 'طرح برتر',
      piIcon: 'pi pi-sparkles',
      style: 'text-yellow-2',
      onClick(row: any) {
        setPrefer(row, event);
      }
    },
    {
      id: 2,
      title: 'حذف کارتابل',
      piIcon: 'pi pi-trash',
      style: 'text-red-2',
      visibility: +route.path.split('/')[3] === 2 || +route.path.split('/')[3] === 4,
      onClick(row: any) {
        deleteData(row, event);
      }
    },
  ];
}

const addPlan = (data: any) => {
  dialog.open(SetPlanNo, {
    props: {
      header: 'افزودن عنوان رشته فعالیت',
      modal: true,
      style: {
        width: '40%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
    onClose: (opt) => {
      if (opt && opt.data) {
        getSurvey();
      }
    },
  });
}

const setPrefer = (data: any, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا برای ثبت طرح برتر اطمینان دارید؟',
    header: 'طرح برتر',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      const body = {
        loanId: data.id,
        isPreferencePlan: data.isPreferencePlan
      }
      MakeResponse.makeServerResponse(SurveyService.setPreferencePlan(body), true, result => {
        if (result.result) {
          setTimeout(() => {
            ToastNotificationService.success('ثبت طرح برتر با موفقیت انجام شد');
            getSurvey();
          }, 100)
        }
      });
    }
  });
}

const deleteData = (data: any, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از حذف داده اطمینان دارید؟',
    header: 'حذف',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      const body = {
        surveyListTypeId: +route.path.split('/')[3],
        loanId: data.id
      }
      MakeResponse.makeServerResponse(SurveyService.removeSurveyLoan(body), true, result => {
        if (result.result) {
          setTimeout(() => {
            ToastNotificationService.success('حذف با موفقیت انجام شد');
            getSurvey();
          }, 100)
        }
      });
    }
  });
}

const downloadExcel = () => {
  MakeResponse.makeServerResponse(SurveyService.downloadExcelSurveyLoan(filter.value), true, result => {
    if (result.result) {
      window.location.href = 'https://samenapi1.karafariniomid.com/loanMonitoring/files/exportLoanSurvey/'+result.result;
    }
  });
}

onMounted(() => {
  filter.value.surveyListType = +route.path.split('/')[3];
  getSurvey();
});

</script>

<style scoped>

</style>