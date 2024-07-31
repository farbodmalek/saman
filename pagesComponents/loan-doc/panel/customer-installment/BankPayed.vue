<template>
  <div>
    <TableContainer
        :has-action="false"
        :total-rows="totalRows"
        @changePage="paging($event)"
        @checked="changeChecked($event)"
        :has-check-box="true"
        :columns="columnTitle"
        :has-header="true"
        :page-number="pageNumber"
        :take="take"
        :list-data="bankPayed">
      <template #header>
        <div class="d-flex justify-content-center align-items-center">
          <p class="mb-0">فهرست پرداختی بانک</p>
        </div>

        <hr/>

        <div class="row">
          <div class="col-md-4 col-sm-12 text-center">تعداد {{ checkedLength }} مورد</div>
          <div class="col-md-2 col-sm-12  text-center p-0">{{ payAmount.toLocaleString() }}</div>
        </div>
      </template>
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {useDialog} from "primevue/usedialog";
import {MakeResponse} from "~/composables/make-response";
import type {BankPayed} from "~~/core/models/loan/bank-payed";
import {onMounted} from "vue";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

const payAmount = ref<number>(0);
const totalRows = ref<number>(0);
const columnTitle = [
  {
    header: 'تاریخ',
    field: 'payDateFa'
  },
  {
    header: 'مبلغ پرداختی',
    field: 'payAmount',
    isCurrency: true
  },
  {
    header: 'وضعیت',
    field: 'payBankStatus'
  },
  {
    header: 'توضیحات',
    field: ''
  }
];
const dialog = useDialog();
const checkedLength = ref<number>(0);
const pageNumber = ref<number>(1);
const take = ref<number>(10);
const bankPayed = ref<BankPayed[]>([])
const bankPayedFilter = ref({
  pageNumber: pageNumber.value,
  take: take.value,
  loanID: props.loanId
});

const paging = (pageData: any) => {
  bankPayedFilter.value.pageNumber = pageData.page + 1;
  bankPayedFilter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = bankPayedFilter.value.pageNumber;
  getBankPayedList();
  changeChecked(null);
}

const getBankPayedList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanBankPayed(bankPayedFilter.value), true, result => {
    if (result.results) {
      bankPayed.value = result.results;
      totalRows.value = result.totalRows;
    }
  });
}

const changeChecked = (event: any) => {
  if (event) {
    checkedLength.value = event.length;
    payAmount.value = event.map((p: BankPayed) => p.payAmount).reduce((sum: number, a: number) => sum + a, 0);
  } else {
    checkedLength.value = 0;
    payAmount.value = 0;
  }
}

onMounted(() => {
  getBankPayedList();
})

</script>

<style scoped>

</style>