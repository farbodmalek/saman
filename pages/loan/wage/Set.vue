<template>
  <div>
    <div class="">
      <div class="d-flex bg-white p-3 justify-content-between ">
        <div v-for="(i, index) in menuItems" :key="index" class="d-flex align-content-center p-1">
          <Checkbox v-model="filter.filterType" :value="i.id" inputId="ingredient1" @change="getActorWages()"/>
          <label class="px-2" for="ingredient1"> {{ i.label }}</label>
        </div>
      </div>

      <MultiParentHeader
          :columns="columns"
          :has-check-box="true"
          :has-header="true"
          :hasPagination="true"
          :hasPaginationAction="true"
          :listData="wageList"
          :pageNumber="pageNumber"
          :take="take"
          :totalRows="totalRows"
          @changePage="paging($event)"
          @Confirmation="actorConfirmation()"
          @checked="checked($event)">
      </MultiParentHeader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {MakeResponse} from "~/composables/make-response";
import {LoanDocsService} from "~/services/loan-docs-service";
import type {Wage} from "~/core/models/management/wage";
import MultiParentHeader from "../../../components/tabel/MultiParentHeader.vue";
import {ToastNotificationService} from "~/core/toast-notification-service";


const filter = ref({
  pageNumber: 1,
  take: 100,
  branches: [],
  filterType: [5]
});

const menuItems = ref<any[]>([
  {id: 1, label: ' فقط لیست حق السعی مربوط به خود کاربری ',},
  {id: 3, label: 'نمایش همه پرونده های تحویلی ',},
  {id: 5, label: ' نمایش تجمیع مبالغ (در صورت زیاد بودن تعداد زمانبر خواهد بود) ',},
]);

const columns = ref([
  {
    header: 'اطلاعات حق السعی از مشتری',
    field: '',
    colspan: 2,
    rowspan: 1,
    child: [
      {
        header: 'شماره فیش',
        hasInput: true,
        id: 1,
        field: 'bankReceiptNumber',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'دریافتی از مشتری',
            colspan: 1,
            field: 'amount',
            hasInput: true,
            second: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'تاریخ فیش',
        hasInput: true,
        colspan: 1,
        id: 2,
        field: 'bankReceiptDateFa',
        rowspan: 1,
        child: [
          {
            field: 'bankDescription',
            header: 'توضیحات',
            colspan: 1,
            hasInput: true,
            rowspan: 1,
          },
        ]
      },
    ]
  },

  {
    header: 'مشخصات پرونده',
    field: '',
    colspan: 4,
    rowspan: 1,
    child: [
      {
        header: 'منطقه',
        field: 'superVisorName',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'شعبه',
            field: 'branchName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'شماره قرارداد',
        field: 'contractNumber',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'مشتری',
            field: 'customerName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'مبلغ وام',
        field: 'loanAmount',
        isCurrency: true,
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'نوع وام',
            field: 'loanTypeDesc',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'مبلغ هر قسط',
        field: 'installmentAmount',
        isCurrency: true,
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تعداد اقساط',
            field: 'installmentCount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
    ]
  },

  {
    header: 'وضعیت در زمان تحویل',
    field: 'actorName',
    colspan: 5,
    rowspan: 1,
    child: [
      {
        header: 'وضعیت در زمان ارجاع',
        field: '',
        colspan: 5,
        rowspan: 1,
        child: [
          {
            header: 'تاریخ تحویل/ارجاع',
            field: 'endDateFa',
            field2: 'referenceDateFa',
            colspan: 1,
            rowspan: 1,
          },
          {
            header: 'وضعیت پرونده ',
            field: 'referenceLoanStatus',
            field2: 'deliverLoanStatus',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'اصل از کارمزد',
            field: 'totalReferenceAmountStart',
            field2: 'totalReferenceAmountEnd',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: '  جریمه',
            field: 'referencePenaltyAmount',
            field2: 'deliverPenaltyAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'اقساط معوق',
            field: 'referenceDelayedAmount',
            field2: 'deliverDelayedAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
    ]
  },

  {
    header: 'اطلاعات حق السعی',
    field: '',
    colspan: 4,
    rowspan: 1,
    child: [
      {
        header: 'مبلغ وصولی',
        field: 'collectedAmount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'بدهی وصولی',
            field: 'collectedDebtAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اقساط وصولی',
        field: 'receiptedInstallment',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط اضافه شده',
            field: 'extraInstallment',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: '',
        field: 'paymentMount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'هزینه پیش اقدامات قضایی (اقدامات اداری)',
            field: 'preWageAmount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: '',
        field: '',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'نحوه محاسبه',
            field: 'preWageDescription',
            colspan: 1,
            rowspan: 1,
          },
        ]
      }

    ]
  },

]);


const wageList = ref<Wage[]>([]);
const totalRows = ref(0)
const tabIndex = ref<number>(1);
const take = ref(10);
const pageNumber = ref(1);
const selectedItems = ref<any>([]);
const actors = ref<any>({
});
const showAcceptPayWage = ref<boolean>(false);


const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getActorWages();
}

const getActorWages = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getActorWages(filter.value), true, result => {
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
    selectedItems.value = data.map(p => {
      return {
        actorId: p.id,
        amount: p.amount,
        bankDescription: p.bankDescription,
        bankReceiptDateFa: p.bankReceiptDateFa,
        bankReceiptNumber: p.bankReceiptNumber,
      };
    });
  } else {
    showAcceptPayWage.value = false;
  }
};

const actorConfirmation=() =>{
  console.log(selectedItems.value)
  actors.value.actors=selectedItems.value
  if(selectedItems.value.length>0){
    MakeResponse.makeServerResponse(LoanDocsService.actorConfirmation(actors.value), true, result => {
      if (result.results) {
          ToastNotificationService.success('عملیات با موفقیت انجام شد ');
      }
    });
  }else{
    ToastNotificationService.error("لطفا آیتم هارا مشخص کنید ")
  }
}





onMounted(() => {
  getActorWages()
})

</script>