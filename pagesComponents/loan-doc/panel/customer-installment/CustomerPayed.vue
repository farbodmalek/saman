<template>
  <div>
    <TableContainer
        :total-rows="totalRows"
        @changePage="paging($event)"
        @checked="changeChecked($event)"
        :has-check-box="true"
        :columns="columnTitle"
        :has-header="true"
        :page-number="pageNumber"
        :take="take"
        :list-data="customerPayed">
      <template #header>
        <div class="d-flex justify-content-center align-items-center">
          <p class="mb-0">فهرست بازپرداختی مشتری</p>
        </div>

        <hr/>

        <div class="row">
          <div class="col-md-2 col-sm-12 text-center">تعداد {{ checkedLength }} مورد</div>
          <div class="col-md-1 col-sm-12 text-center p-0">{{ baseAmount.toLocaleString() }}</div>
          <div class="col-md-1 col-sm-12 text-center p-0">{{ penaltyAmount.toLocaleString() }}</div>
          <div class="col-md-2 col-sm-12 text-center p-0">{{ mainAmount.toLocaleString() }}</div>
          <div class="col-md-1 col-sm-12 text-center p-0">{{ profitAmount.toLocaleString() }}</div>
          <div class="col-md-1 col-sm-12 text-center p-0">{{ waitProfitAmount.toLocaleString() }}</div>
          <div class="col-md-2 col-sm-12 text-center p-0">{{ discountAmount.toLocaleString() }}</div>
        </div>
      </template>
    </TableContainer>
  </div>
</template>

<script lang="ts" setup>
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import type {LoanCustomerPayed} from "~~/core/models/loan/loan-customer-payed";
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import PayedDetail from "./PayedDetail.vue";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

const dialog = useDialog();
const checkedLength = ref<number>(0);
const pageNumber = ref<number>(1);
const take = ref<number>(10);
const baseAmount = ref<number>(0);
const penaltyAmount = ref<number>(0);
const mainAmount = ref<number>(0);
const profitAmount = ref<number>(0);
const waitProfitAmount = ref<number>(0);
const discountAmount = ref<number>(0);
const totalRows = ref<number>(0);
const columnTitle = [
  {
    header: 'شناسه',
    field: 'payNo'
  },
  {
    header: 'تاریخ',
    field: 'payDateFa'
  },
  {
    header: 'کل پرداختی',
    field: 'baseAmount',
    isCurrency: true
  },
  {
    header: 'پرداختی از جریمه',
    field: 'penaltyAmount',
    isCurrency: true
  },
  {
    header: 'پرداختی از اصل',
    field: 'mainAmount',
    isCurrency: true
  },
  {
    header: 'پرداختی از کارمزد',
    field: 'profitAmount',
    isCurrency: true
  },
  {
    header: 'پرداختی کارمزد معطلی',
    field: 'waitProfitAmount',
    isCurrency: true
  },
  {
    header: 'مبلغ تخفیف',
    field: 'discountAmount',
    isCurrency: true
  },
  {
    header: 'شماره سند',
    field: 'accountNo',
  },
  {
    header: 'تاریخ سند',
    field: 'accountDateFa',
  },
];
const customerPayed = ref<LoanCustomerPayed[]>([]);
const customerPayedFilter = ref({
  branches: [],
  documentTypeIdList: [],
  loanID: props.loanId,
  loanMinorTypeDto: {},
  pageNumber: pageNumber.value,
  take: take.value
});

const changeChecked = (event: any) => {
  if (event) {
    checkedLength.value = event.length;
    baseAmount.value = event.map((p: LoanCustomerPayed) => p.baseAmount).reduce((sum: number, a: number) => sum + a, 0);
    penaltyAmount.value = event.map((p: LoanCustomerPayed) => p.penaltyAmount).reduce((sum: number, a: number) => sum + a, 0);
    mainAmount.value = event.map((p: LoanCustomerPayed) => p.mainAmount).reduce((sum: number, a: number) => sum + a, 0);
    profitAmount.value = event.map((p: LoanCustomerPayed) => p.profitAmount).reduce((sum: number, a: number) => sum + a, 0);
    waitProfitAmount.value = event.map((p: LoanCustomerPayed) => p.waitProfitAmount).reduce((sum: number, a: number) => sum + a, 0);
    discountAmount.value = event.map((p: LoanCustomerPayed) => p.discountAmount).reduce((sum: number, a: number) => sum + a, 0);
  } else {
    checkedLength.value = 0;
    baseAmount.value = 0;
    penaltyAmount.value = 0;
    mainAmount.value = 0;
    profitAmount.value = 0;
    waitProfitAmount.value = 0;
    discountAmount.value = 0;
  }
}

const paging = (pageData: any) => {
  customerPayedFilter.value.pageNumber = pageData.page + 1;
  customerPayedFilter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = customerPayedFilter.value.pageNumber;
  getCustomerPayed();
  changeChecked(null);
}

const getCustomerPayed = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanCustomerPayed(customerPayedFilter.value), true, result => {
    if (result.results) {
      customerPayed.value = result.results;
      totalRows.value = result.totalRows;
      customerPayed.value.forEach((p, index) => columnAction(index));
    }
  });
}

const columnAction = (index: number) => {
  customerPayed.value[index].columnActions = [
    {
      id: 1,
      title: 'جزئیات',
      piIcon: 'pi pi-file',
      style: 'text-primary',
      onClick(row: any) {
        onshowDetail(row);
      }
    }
  ];
}

const onshowDetail = (data: LoanCustomerPayed) => {
  data.listType = 1;
  dialog.open(PayedDetail, {
    props: {
      header: 'جزئیات پرداخت',
      modal: true,
      style: {
        width: '80%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
  });
}

onMounted(() => {
  getCustomerPayed();
});
</script>

<style scoped>

</style>