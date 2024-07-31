<template>
  <div class="">

    <div class="d-flex bg-white p-3 justify-content-between ">
      <div class="d-flex align-content-center p-1" v-for="i in menuItems" :key="index">
        <Checkbox v-model="filter.filterType" inputId="ingredient1" :value="i.id" @change="GetActorWages()"/>
        <label for="ingredient1" class="px-2"> {{ i.label }}</label>
      </div>
    </div>
    <MultiParentHeader
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
    </MultiParentHeader>
  </div>
</template>

<script lang="ts" setup>
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import {LoanDocsService} from "~/services/loan-docs-service";
import MultiParentHeader from "../../components/tabel/MultiParentHeader.vue";
import {useConfirm} from "primevue/useconfirm";
import type {Wage} from "~/core/models/management/wage";
import index from "primevue/passthrough/tailwind";
import {ToastNotificationService} from "~/core/toast-notification-service";


const filter = ref(
    {
      pageNumber: "1",
      take: 100,
      branches: [],
      filterType: [3]
    }
);
const wageList = ref<Wage[]>([]);
const usersList = ref();
const totalRows = ref(0);
const take = ref(10);
const pageNumber = ref(1);
const selectedItems = ref<number[]>([]);
const showAcceptPayWage = ref<boolean>(false);
const router = useRouter();
const dialog = useDialog();
const confirm = useConfirm();
const tabIndex = ref<number>(1);
const selectedComponent = ref();

const menuItems = ref<any[]>([
  {id: 3, label: 'نمایش همه ',},
  {id: 1, label: ' فقط لیست حق السعی مربوط به خود کاربر ',},
  {id: 2, label: 'همه پرونده های تحویلی ',},
  {id: 4, label: 'نمایش پرونده های تایید پرداخت شده ',},
  {id: 5, label: ' نمایش تجمیع مبالغ (در صورت زیاد بودن تعداد زمانبر خواهد بود) ',},
]);


const columns = ref([
  {
    header: 'کد',
    field: 'id',
    colspan: 1,
    rowspan: 3,
  },
  {
    header: 'اقدام کننده',
    field: 'actorName',
    colspan: '1',
    rowspan: 3,
  },
  {
    header: 'تاریخ محاسبه',
    field: 'bankReceiptDateFa',
    colspan: 1,
    rowspan: 1,
    child: [
      {
        header: 'وضعیت حق السعی',
        field: 'calculationStatus',
        colspan: 1,
        rowspan: 2,
      }
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
    colspan: '7',
    rowspan: 1,
    child: [
      {
        header: 'وضعیت در زمان ارجاع',
        field: '',
        colspan: '7',
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
            header: 'وضعیت وام',
            field: 'deliverLoanStatus',
            field2: 'referenceLoanStatus',
            colspan: 1,
            rowspan: 1,
          },
          {
            header: 'بدهی',
            field: 'deliverAmount',
            field2: 'referenceAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'بدهی از اصل',
            field: 'deliverMainAmount',
            field2: 'referenceMainAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'بدهی از کارمزد',
            field: 'deliverProfitAmount',
            field2: 'referenceProfitAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'بدهی از جریمه',
            field: 'deliverPenaltyAmount',
            field2: 'referencePenaltyAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'اقساط معوق',
            field: 'deliverDelayedAmount',
            field2: 'referenceDelayedAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
    ]
  },
  {
    header: 'مبالغ وصولی',
    field: '',
    colspan: 5,
    rowspan: 1,
    child: [
      {
        header: 'مبلغ وصولی',
        field: 'collectedAmount',
        colspan: 1,
        isCurrency: true,
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
        header: 'وصولی از اصل',
        field: 'collectedMainAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی از جریمه',
            field: 'collectedPenaltyAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی از کارمزد',
        field: 'collectedProfitAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی از کارمزد معطلی',
            field: 'collectedDelayProfitAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی در سررسیدگذشته',
        field: 'collectedOverdueAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی در مشکوک‌الوصول',
            field: 'collectedDoubtfulAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی در معوق',
        field: 'collectedDelayedAmount',
        colspan: 1,
        rowspan: 1,
        isCurrency: true,
        child: [
          {
            header: 'مبلغ تخفیف',
            field: 'discountAmount',
            colspan: 1,
            rowspan: 1,
            isCurrency: true,
          },
        ]
      }
    ]
  },
  {
    header: 'اقساط وصولی',
    field: '',
    colspan: 3,
    rowspan: 1,
    child: [
      {
        header: 'اقساط اثریافته',
        field: 'affectedInstallment',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط تسویه شده از بدهی',
            field: 'settlementDebtInstallment',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اقساط تسویه شده',
        field: 'settlementInstallment',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط سررسید اضافه شده',
            field: 'usanceInstallment',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اقساط وصولی معادل',
        field: 'usanceInstallment',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط وصولی معادل از بدهی',
            field: 'collectedEqualDebt',
            colspan: 1,
            rowspan: 1,
          },
        ]
      }

    ]
  },
  {
    header: 'اطلاعات ارجاع',
    field: '',
    colspan: 2,
    rowspan: 1,
    child: [
      {
        header: 'ارجاع دهنده',
        field: 'referenceUserName',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تحویل گیرنده/پس دهنده',
            field: 'fullRollbackUserName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: ' ',
        field: '',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'هزینه پیش اقدامات قضایی (اقدامات اداری)',
            field: 'wageAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },

    ]
  },
  {
    header: 'هزینه پیش اقدامات قضایی (اقدامات اداری)',
    field: '',
    colspan: 5,
    rowspan: 1,
    child: [
      {
        header: 'شماره فیش',
        field: 'bankReceiptNumber',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'دریافتی از مشتری',
            field: 'amount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'تاریخ فیش',
        field: 'bankReceiptDateFa',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'هزینه صندوق',
            field: 'wageAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'تاریخ تایید اقدام کننده',
        field: 'confirmationDateFa',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تاریخ تایید شهرستان',
            field: 'cityManagerConfirmationDateFa',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'ماه پرداخت',
        field: 'paymentMount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تاریخ تایید پرداخت',
            field: 'paymentConfirmationDateFa',
            colspan: 1,
            rowspan: 1,
          },
        ]
      } ,
      {
        header: '',
        field: '',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'نحوه محاسبه',
            field: 'wageDescription',
            colspan: 1,
            rowspan: 1,
          },
        ]
      }

    ]
  },
]);


const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  GetActorWages();
}

const GetActorWages = () => {
  if (!filter.value.filterType.includes(5)) {
    MakeResponse.makeServerResponse(LoanDocsService.getAllUserActors(filter.value), true, result => {
      if (result.results) {
        wageList.value = result.results.map((p: any) => {
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
  } else if (filter.value.filterType.includes(5) && selectedItems.value.length <= 0) {
    ToastNotificationService.error("لطفا آیتم هارا مشخص کنید ")
  } else if (filter.value.filterType.includes(5) && showAcceptPayWage.value) {
    MakeResponse.makeServerResponse(LoanDocsService.aggregationfilter(selectedItems.value), true, result => {
      if (result.results) {
        wageList.value = result.results.map((p: any) => {
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

}

const getRowAction = (row: any) => {
  router.push({path: `/loan/${row.data.customerNumber}`, query: {title: 'total'}});
}


const checked = (data: Wage[]) => {

  if (data && data.length > 0) {
    selectedItems.value = data.map(p => p.id);
    console.log(selectedItems.value)
    showAcceptPayWage.value = true;
  } else
    showAcceptPayWage.value = false;
}

onMounted(() => {
  GetActorWages()
})

</script>

<style scoped>

</style>