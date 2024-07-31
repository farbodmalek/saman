<template>
  <div class="">

      <div class="d-flex gap-4 align-items-center align-content-center">

        <div class="col-md-4 col-sm-12 form-group custom-input2">
          <label class="required text-white">از تاریخ </label>
          <DatePicker v-model="filter.fromRollBackDateFa"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label class="required text-white">تا تاریخ </label>
          <DatePicker v-model="filter.toRollBackDateFa"/>
        </div>

        <div class="col-md-4 col-sm-12 form-group m-auto">
        <button class="btn btn-primary fw-normal " @click="getSqlOracleLoanListQuery()">فیلتر</button>
      </div>

      </div>

    <MultiParentHeader
        @action="getRowAction($event)"
        @changePage="paging($event)"
        :take="take"
        :has-header="true"
        :pageNumber="pageNumber"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns"
        :hasAction="false"
        :has-check-box="false"
        :hasPagination="false"

    >
    </MultiParentHeader>
  </div>
</template>

<script lang="ts" setup>
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import {ManagementService} from "~/services/management-service";
import MultiParentHeader from "../../components/tabel/MultiParentHeader.vue";
import {useConfirm} from "primevue/useconfirm";


const route = useRoute();

const columns = ref([
  {
    header: 'تاریخ',
    field: '',
    colspan: 1,
    rowspan: 1,
    child: [
      {
        header: 'نگین',
        field: 'calulateDateFa',
        colspan: 1,
        rowspan: 1,
      },

    ]
  },

  {
    header: 'RollBack',
    field: '',
    colspan: 3,
    rowspan: 1,
    child: [
      {
        header: 'نگین',
        field1: 'oracleRBCount',
        colspan: 1,
        rowspan: 1,
      },
      {
        header: 'وصول ',
        field1: 'sqlRBCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
      {
        header: 'اختلاف',
        field1: 'diffRBCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
    ]
  },

  {
    header: 'LoanPayCard(کارت قسط)',
    field1: '',
    colspan: 3,
    rowspan: 1,
    child: [
      {
        header: 'نگین',
        field1: 'oracleCardCount',

        colspan: 1,
        rowspan: 1,
      },
      {
        header: 'وصول ',
        field1: 'sqlCardCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
      {
        header: 'اختلاف',
        field1: 'diffCardCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
    ]
  },

  {
    header: 'LoanPayInfo(پرداخت)',
    field1: 'actorName',
    colspan: 3,
    rowspan: 1,
    child: [
      {
        header: 'نگین',
        field1: 'oracleInfoesCount',
        colspan: 1,
        rowspan: 1,
      },
      {
        header: 'وصول ',
        field1: 'sqlInfoesCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
      {
        header: 'اختلاف',
        field1: 'diffInfoesCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
    ]
  },

  {
    header: 'LoanPayDetail(جزئیات پرداخت)',
    field: '',
    colspan: 3,
    rowspan: 1,
    child: [
      {
        header: 'نگین',
        field1: 'oracleDetailCount',
        colspan: 1,
        rowspan: 1,
      },
      {
        header: 'وصول ',
        field1: 'sqlDetailCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
      {
        header: 'اختلاف',
        field1: 'diffDetailCount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
      },
    ]
  },




]);


const filter = ref({
  take: 10,
  pageNumber: 1,
  branches: [],
   fromRollBackDateFa: null,
   toRollBackDateFa: null,
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
  getSqlOracleLoanListQuery();
}

const getSqlOracleLoanListQuery = () => {
  MakeResponse.makeServerResponse(ManagementService.getSqlOracleLoanListQuery(filter.value), true, result => {
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
    }
  });
}

const getRowAction = (row: any) => {
  router.push({path: `/loan/${row.data.customerNumber}`, query: {title: 'total'}});
}

// onMounted(()=>{
//   getSqlOracleLoanListQuery()
// })

</script>

<style scoped>

</style>