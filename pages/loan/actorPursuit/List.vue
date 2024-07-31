<template>
  <div>
    <div class="">
      <div class="d-flex bg-white p-3 justify-content-between ">
        <div v-for="i in menuItems" :key="index" class="d-flex align-content-center p-1">
          <Checkbox v-model="filter.filterType" :value="i.id" inputId="ingredient1" @change="getActorWages()"/>
          <label class="px-2" for="ingredient1"> {{ i.label }}</label>
        </div>
      </div>
      <MultiParentHeader
          :columns="columns"
          :has-check-box="false"
          :has-header="true"
          :hasPagination="false"
          :listData="wageList"
          :pageNumber="pageNumber"
          :take="take"
          :totalRows="totalRows"
          @changePage="paging($event)"
          @checked="checked($event)">
      </MultiParentHeader>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {MakeResponse} from "~/composables/make-response";
import {LoanDocsService} from "~/services/loan-docs-service";
import type {Wage} from "~/core/models/management/wage";
import MultiParentHeader from "../../components/tabel/MultiParentHeader.vue";


const filter = ref({
  pageNumber: 1,
  take: 100,
  branches: [],
  documentTypeIdList: [],
  loanMinorTypeDto: {}
});

const menuItems = ref<any[]>([
  {id: 1, label: ' فقط لیست حق السعی مربوط به خود کاربری ',},
  {id: 3, label: 'نمایش همه پرونده های تحویلی ',},
  {id: 5, label: ' نمایش تجمیع مبالغ (در صورت زیاد بودن تعداد زمانبر خواهد بود) ',},
]);

const columns = ref([
  {
    header: 'مشخصات اقدام کننده',
    field: '',
    colspan: 1,
    rowspan: 1,
    child: [
      {
        header: 'نام اقدام کننده',
        field: 'fullUserName',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'نوع اقدام کننده',
            field: 'roleDesc',
            colspan: 1,
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
        field: 'supervisorName',
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
        field: 'loanNumber',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'مشتری',
            field: 'fullCustomerName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'مبلغ وام',
        field: 'acceptAmount',
        isCurrency: true,
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'نوع وام',
            field: 'loanInstallmentTypeName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'مبلغ هر قسط',
        field: 'eachInstallmentAmount',
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
    header: 'وضعیت در زمان ارجاع',
    field: 'actorName',
    colspan: 7,
    rowspan: 1,
    child: [
        {
      header: 'تاریخ ارجاع  ',
      field: '',
      colspan: 1,
      rowspan: 1,
      child:[ {
        header: 'تاریخ تحویل',
        field: 'referenceDateFa',
        field2: 'endDateFa',
        colspan: 1,
        rowspan: 1,
      },]
    },
      {
        header: 'وضعیت در زمان تحویل  ',
        field: '',
        colspan: 6,
        rowspan: 1,
        child: [
          {
            header: 'وضعیت وام',
            field: 'loanStatusTypeDescEnd',
            field2: 'loanStatusTypeDescBegin',
            colspan: 1,
            rowspan: 1,
          },
          {
            header: 'بدهی ',
            field: 'delayedDebtAmountEnd',
            field2: 'delayedDebtAmountBegin',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'بدهی از اصل',
            field: 'delayedFromAmountEnd',
            field2: 'delayedFromAmountBegin',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: '  بدهی از کارمزد',
            field: 'delayedFromAmountEnd',
            field2: 'delayedFromProfitBegin',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'جریمه تاخیر',
            field: 'penaltyAmountEnd',
            field2: 'penaltyAmountBegin',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
          {
            header: 'اقساط معوق',
            field: 'numberOfDelayedInstallmentEnd',
            field2: 'numberOfDelayedInstallmentBegin',
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
        field: 'totalAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'بدهی وصولی',
            field: 'debtCollected',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی از اصل',
        field: 'payedAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی از جریمه',
            field: 'payedFromPenalty',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی از کارمزد',
        field: 'payedProfit',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی از کارمزد معطلی',
            field: 'delayedBenefitAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی در سررسیدگذشته',
        field: 'pastOfMatureAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'وصولی در مشکوک‌الوصول',
            field: 'doubtfulAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وصولی در معوق',
        field: 'debtDelayInstallments',
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
        header: 'اقساط اثر یافته',
        field: 'effectiveInstallmentsCount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط تسویه شده از بدهی',
            field: 'squareInstallmentsDebtCount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اقساط تسویه شده',
        field: 'squareInstallmentsCount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'قساط سررسید اضافه شده',
            field: 'matureInstallmentsDebtCount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اقساط وصولی معادل',
        field: 'debtInstallmentsEquivalentCount',
        isCurrency: true,
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اقساط وصولی معادل از بدهی',
            field: 'receiptInstallmentsCount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },

    ]
  },
  {
    header: 'اطلاعات ارجاع',
    field: '',
    colspan: 1,
    rowspan: 1,
    child: [
      {
        header: 'ارجاع دهنده',
        field: 'fullReferenceUserName',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تحویل گیرنده / پس گیرنده',
            field: 'rollbackUserName',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
    ]
  },
  {
    header: 'هزینه پیش اقدامات قضایی (اقدامات اداری)',
    field: '',
    colspan:2,
    rowspan: 1,
    child: [
      {
        header: 'مبلغ',
        field: 'wageAmount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'دریافتی از مشتری',
            field: 'deliverAmount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'وضعیت',
        field: 'actorStatusDesc',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'ماه پرداخت',
            field: 'payMonth',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
    ]
  },
  {
    header: 'وضعیت پرونده در حال حاضر',
    field: '',
    colspan: 5,
    rowspan: 1,
    child: [
      {
        header: 'مبلغ بازپرداختی',
        field: 'totalRefundAmount',
        colspan: 1,
        isCurrency: true,
        rowspan: 1,
        child: [
          {
            header: 'مورد انتظار وصول',
            field: 'visionAmount',
            colspan: 1,
            isCurrency: true,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'مبلغ معوق',
        field: 'totalDelayedAmount',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'تعداد اقساط معوق',
            field: 'maturedInstallmentsCount',
            colspan: 1,
            rowspan: 1,
          },
        ]
      },
      {
        header: 'اولین قسط پرداخت نشده ',
        field: 'firstDelayedInstallmentDateFa',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'اخرین قسط پرداخت نشد ه ',
            field: 'lastDelayedInstallmentDateFa',
            colspan: 1,
            rowspan: 1,
          },
        ]
      } ,
      {
        header: 'آخرین وضعیت ',
        field: 'loanStatusTypeName',
        colspan: 1,
        rowspan: 1,
        child: [
          {
            header: 'آخرین اقدام',
            field: 'lastActionTypeName',
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


const wageList = ref<Wage[]>([]);
const totalRows = ref(0)
const tabIndex = ref<number>(1);
const take = ref(10);
const pageNumber = ref(1);
const selectedItems = ref<number[]>([]);
const showAcceptPayWage = ref<boolean>(false);


const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = filter.value.pageNumber;
  getActorPursuitQuery();
}

const getActorPursuitQuery = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getActorPursuitQuery(filter.value), true, result => {
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
  getActorPursuitQuery()
})

</script>