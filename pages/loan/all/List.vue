<template>
  <div class="">
    <MultiHeader
        :has-check-box="true"
        @action="getColumnActions($event)"
        @changePage="paging($event)"
        :take="take"
        :has-header="true"
        :pageNumber="pageNumber"
        :listData="loanList"
        :totalRows="totalRows"
        :columns="columns">
      <!--      <template #header>-->
      <!--        <div class="d-flex justify-content-end">-->
      <!--          <span @click="downloadExcel()"><i class="pi pi-file-excel text-green-1 cursor-pointer"></i></span>-->
      <!--        </div>-->
      <!--      </template>-->
    </MultiHeader>
  </div>
</template>

<script setup lang="ts">
import MultiHeader from "../../../components/tabel/MultiHeader.vue";
import type {LoanAll} from "~~/core/models/loan/loan-all";
import {LoanDocsService} from "~/services/loan-docs-service";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import SetDie from "../../../pagesComponents/loan-doc/SetDie.vue";
import SetPlanNo from "../../../pagesComponents/loan-doc/SetPlanNo.vue";
import {useConfirm} from "primevue/useconfirm";
import {useDialog} from "primevue/usedialog";
import {MakeResponse} from "~/composables/make-response";

const columns = ref([
  {
    id: 1,
    header1: 'شماره مشتری',
    field1: 'customerInfo',
    format1: 'action',
    header2: 'نوع قسط',
    field2: 'loanInstallmentTypeDesc',
  },
  {
    header1: 'شماره قرارداد',
    field1: 'loanNumber',
    header2: 'تاریخ قرارداد',
    field2: 'beginDateFa',
  },
  {
    header1: 'وام گیرنده',
    field1: 'fullCustumerName',
    header2: 'اقدام کننده',
    field2: 'lastActorName',
  },
  {
    header1: 'سرپرستی',
    field1: 'supervisorName',
    header2: 'شعبه ارسال کننده',
    field2: 'branchName',
  },
  {
    header1: 'اولین قسط پرداخت نشده',
    field1: 'firstDelayedInstallmentDateFa',
    header2: 'تعداد اقساط/معوق',
    field2: 'installmentCount',
  },
  {
    header1: 'مبلغ وام',
    field1: 'acceptAmount',
    isCurrency1: true,
    header2: 'کل مبلغ معوق',
    field2: 'totalDelayedAmount',
    isCurrency2: true,
  },
  {
    header1: 'مورد انتظار وصول',
    field1: 'visionAmount',
    isCurrency1: true,
    header2: 'کل بازپرداختی',
    field2: 'totalRefundAmount',
    isCurrency2: true,
  },
  {
    header1: 'اخرین وضعیت',
    field1: 'loanStatusTypeDesc',
    header2: 'آخرین اقدام',
    field2: 'lastActionName',
  },
  {
    header1: 'تاریخ حقوقی شدن پرونده',
    field1: 'referenceDateFa',
    header2: '',
    field2: '',
  },
]);
const filter = ref({
  take: 10,
  pageNumber: 1,
});
const totalRows = ref(0);
const take = ref(10);
const pageNumber = ref(1);
const loanList = ref<LoanAll[]>([]);
const router = useRouter();
const confirm = useConfirm();
const dialog = useDialog();

const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getLoanAll();
}

const getLoanAll = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getAllLoan(filter.value), true, result => {
    if (result.results) {
      loanList.value = result.results.map((p: LoanAll) => {
        return {
          ...p,
          installmentCount: p.installmentCount + '/' + p.numberOfDelayedInstallment,
          customerInfo: !p.isLegal && p.isLegalReady && !p.legalName ?
              p.customerNumber + p.isDeathName + ',' + p.legalName + 'حقوقی قدیم'
              : p.isDeathName + p.customerNumber + p.legalName
        }
      });
      totalRows.value = result.totalRows;
      loanList.value.forEach((p, index) => columnActions(index));
    }
  });
}

const getColumnActions = (event: any) => {
  if (event.col.id === 1) {
    router.push({path: `/loan/${event.data.customerNumber}`, query: {title: 'TotalDoc'}});
  }
}

const columnActions = (index: number) => {
  loanList.value[index].columnActions = [
    {
      id: 1,
      title: 'به روز رسانی',
      piIcon: 'pi pi-refresh',
      style: 'text-primary',
      visibility: BasePage.hasPermission(ActivitiesEnum.refreshLoan),
      onClick(row: any) {
        refreshLoansTotal(row, event)
      }
    },
    {
      id: 2,
      title: 'حذف و درج مجدد',
      piIcon: 'pi pi-sync',
      style: 'text-purple-1',
      visibility: BasePage.hasPermission(ActivitiesEnum.refreshLoan),
      onClick(row: any) {
        deleteAndReload(row, event)
      }
    },
    {
      id: 3,
      title: 'فوتی',
      piIcon: 'pi pi-truck',
      style: 'text-red-2',
      visibility: BasePage.hasPermission(ActivitiesEnum.setDeath),
      onClick(row: any) {
        isDie(row)
      }
    },
    {
      id: 3,
      title: 'افزودن عنوان رشته فعالیت',
      piIcon: 'pi pi-slack',
      style: 'text-orange-1',
      onClick(row: any) {
        addPlanNo(row)
      }
    },
  ];
}

const refreshLoansTotal = (data: LoanAll, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا اطمینان به بازسازی پرونده دارید؟',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      const body = {
        loanNumber: data.loanId,
        isDelete: '0'
      }
      MakeResponse.makeServerResponse(LoanDocsService.loanRefresh(body), true, result => {
        if (result.result) {
          setTimeout(() => {
            ToastNotificationService.success('به روز رسانی با موفقیت انجام شد');
            getLoanAll();
          }, 100);
        }
      });
    }
  });
}

const deleteAndReload = (data: LoanAll, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا اطمینان به حذف و ساخت مجدد پرونده دارید؟',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      deleteDoc(data);
    }
  });
}

const isDie = (data: LoanAll) => {
  dialog.open(SetDie, {
    props: {
      header: 'فوتی',
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
        getLoanAll();
      }
    },
  });
}

const addPlanNo = (data: LoanAll) => {
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
        getLoanAll();
      }
    },
  });
}

const deleteDoc = (data: LoanAll, isDeleted: string = '0') => {
  const body = {
    loanNumber: data.loanNumber,
    isDelete: isDeleted
  }
  MakeResponse.makeServerResponse(LoanDocsService.loanRefresh(body), true, result => {
    if (result.result  !== null) {
      setTimeout(() => {
        if (isDeleted !== '1') {
          deleteDoc(data, '1');
          ToastNotificationService.success('به روز رسانی با موفقیت انجام شد');
        }
        if (isDeleted === '1')
          getLoanAll();
      }, 100);
    }
  });
}

onMounted(() => {
  getLoanAll();
})
</script>

<style scoped>

</style>