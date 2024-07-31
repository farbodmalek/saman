<template>
  <div>
    <TableContainer
        :has-pagination="false"
        @changePage="paging($event)"
        :columns="columnTitle"
        :has-action="false"
        :total-rows="totalRows"
        :page-number="pageNumber"
        :take="take"
        :list-data="detail">
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {MakeResponse} from "~/composables/make-response";
import {LoanDocsService} from "~/services/loan-docs-service";
import type {CustomerPayedDetail} from "~~/core/models/loan/customer-payed-detail";

const pageNumber = ref<number>(1);
const take = ref<number>(100);
const totalRows = ref<number>(0);
const params = ref();
const detail = ref<CustomerPayedDetail[]>([]);
const dialogRef = inject('dialogRef');
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
    header: 'پرداختی از کارمزد معطلی',
    field: 'waitProfitAmount',
    isCurrency: true
  },
  {
    header: 'تعداد روزهای تاخیر',
    field: 'dayDelay'
  },
  {
    header: 'مانده قسط',
    field: 'remainAmount',
    isCurrency: true
  },
];
const filter = ref({
  branches: [],
  listType: 1,
  loanId: 0,
  pageNumber: 1,
  payNo: 0,
  take: 100,
  paySerial: 0
});
const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getDetail();
}

const getDetail = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanCustomerPayedDetail(filter.value), true, result => {
    if (result.results) {
      detail.value = result.results;
      totalRows.value = result.totalRows;
    }
  });
}

onMounted(() => {
  params.value = dialogRef.value.data;
  filter.value.payNo = params.value.payNo;
  filter.value.loanId = params.value.loanId;
  filter.value.listType = params.value.listType;
  filter.value.paySerial = params.value.paySerial;
  getDetail();
})
</script>

<style scoped>

</style>