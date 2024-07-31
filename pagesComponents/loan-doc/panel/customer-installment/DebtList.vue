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
        :list-data="debtList">
      <template #header>
        <div class="d-flex justify-content-center align-items-center">
          <p class="mb-0">فهرست اقساط</p>
        </div>

        <hr/>

        <div class="row">
          <div class="col-md-5 col-sm-12 text-center">تعداد {{ checkedLength }} مورد</div>
          <div class="col-md-3 col-sm-12 text-center p-0">{{ payAmount.toLocaleString() }}</div>
          <div class="col-md-1 col-sm-12 text-center p-0">{{ payProfit.toLocaleString() }}</div>
          <div class="col-md-2 col-sm-12 text-center p-0">{{ waitProfitAmount.toLocaleString() }}</div>
        </div>
      </template>
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {useDialog} from "primevue/usedialog";
import type {DebtList} from "~~/core/models/loan/debt-list";
import PayedDetail from "../../../../pagesComponents/loan-doc/panel/customer-installment/PayedDetail.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

const payAmount = ref<number>(0);
const payProfit = ref<number>(0);
const totalRows = ref<number>(0);
const waitProfitAmount = ref<number>(0);
const dialog = useDialog();
const checkedLength = ref<number>(0);
const pageNumber = ref<number>(1);
const take = ref<number>(10);
const debtList = ref<DebtList[]>([]);
const columnTitle = [
  {
    header: 'سریال قسط',
    field: 'paySerial',
    style: 'style'
  },
  {
    header: 'تاریخ قسط',
    field: 'payDateFa',
    style: 'style'
  },
  {
    header: 'وضعیت قسط',
    field: 'isComplete',
    style: 'style'
  },
  {
    header: 'مبلغ قسط',
    field: 'payAmount',
    isCurrency: true,
    style: 'style'
  },
  {
    header: 'کارمزد قسط',
    field: 'payProfit',
    isCurrency: true,
    style: 'style'
  },
  {
    header: 'کارمزد معطلی',
    field: 'waitProfitAmount',
    isCurrency: true,
    style: 'style'
  },
];
const debtFilter = ref({
  pageNumber: pageNumber.value,
  take: take.value,
  loanID: props.loanId
});

const changeChecked = (event: any) => {
  if (event) {
    checkedLength.value = event.length;
    payAmount.value = event.map((p: DebtList) => p.payAmount).reduce((sum: number, a: number) => sum + a, 0);
    payProfit.value = event.map((p: DebtList) => p.payProfit).reduce((sum: number, a: number) => sum + a, 0);
    waitProfitAmount.value = event.map((p: DebtList) => p.waitProfitAmount).reduce((sum: number, a: number) => sum + a, 0);
  } else {
    checkedLength.value = 0;
    payAmount.value = 0;
    payProfit.value = 0;
    waitProfitAmount.value = 0;
  }
}

const paging = (pageData: any) => {
  debtFilter.value.pageNumber = pageData.page + 1;
  debtFilter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = debtFilter.value.pageNumber;
  getBankPayedList();
  changeChecked(null);
}

const getBankPayedList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanDebtList(debtFilter.value), true, result => {
    if (result.results) {
      debtList.value = result.results.map((p: DebtList) => {
        return {
          ...p,
          isComplete: p.isComplete ? 'پرداخت شده' : 'پرداخت نشده',
          style: p.isComplete ? '' : 'bg-red-2 text-white',
        }
      });
      totalRows.value = result.totalRows;
      debtList.value.forEach((p, index) => columnAction(index));
    }
  });
}

const columnAction = (index: number) => {
  debtList.value[index].columnActions = [
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

const onshowDetail = (data: DebtList) => {
  data.loanId = props.loanId;
  data.listType = 2;
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
  getBankPayedList();
});
</script>