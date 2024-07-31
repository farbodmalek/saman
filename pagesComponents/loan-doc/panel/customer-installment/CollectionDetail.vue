<template>
  <div>

    <div class="">
      <EffectiveDate @dateTime="getDateTime($event)" @reload="onUpdate($event)"/>
    </div>

    <div class="font-0-9 w-100 text-white bg-black-2 p-2 text-center mt-3 rounded-2">آخرین وضعیت بدهی</div>
    <div class="row m-0" v-if="lastDebtData">

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">زمان:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.effectiveDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">وضعیت:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.loanStatusTypeName }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">اقساط پرداخت نشده:</span>
        <span class="font-0-8 text-dark">{{
            lastDebtData.loanAccModelTotal?.maturedInstallmentsCount.toLocaleString()
          }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">اقساط پرداخت شده:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.payedInstallmentsCount }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">تاریخ اولین قسط:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.firstInstallmentDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">تعداد پرداختی صندوق:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.bankPayCount.toLocaleString() }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">پرداختی صندوق:</span>
        <span class="font-0-8 text-dark">
        {{ lastDebtData.loanAccModelTotal?.bankPayAmount.toLocaleString() }}
        <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.bankPayAmount">ریال</span>
      </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">آخرین پرداختی صندوق:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.lastPayBankDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مبلغ تخفیف:</span>
        <span class="font-0-8 text-dark">
        {{ lastDebtData.loanAccModelTotal?.discountAmount.toLocaleString() }}
        <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.discountAmount">ریال</span>
      </span>
      </div>

    </div>

    <div class="font-0-9 w-100 text-white bg-black-2 p-2 text-center mt-3 rounded-2">مطالبات</div>
    <div class="row m-0" v-if="lastDebtData">

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">کل مطالبات:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.totalRemainAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.totalRemainAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مطالبات از اصل:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.demandFromMain.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.demandFromMain">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مطالبات از کارمزد معطلی:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.remainWaitProfitAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.remainWaitProfitAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مطالبات از کارمزد:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.demandFromProfit.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.demandFromProfit">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">جریمه تاخیر:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.penaltyAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.penaltyAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">اولین قسط پرداخت نشده:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.firstDelayedInstallmentDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">آخرین قسط پرداخت نشده:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.lastDelayedInstallmentDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">تعداد اقساط باقیمانده:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.totalInstallmentsCount }}</span>
      </div>

    </div>

    <div class="font-0-9 w-100 text-white bg-black-2 p-2 text-center mt-3 rounded-2">پرداختی مشتری</div>
    <div class="row m-0" v-if="lastDebtData">

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مبلغ کل بازپرداختی:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.totalRefundAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.totalRefundAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">بازپرداختی از اصل:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.payedAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.payedAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">بازپرداختی از سود:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.payedProfit.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.payedProfit">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">پرداختی سود معوق:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.delayedBenefitAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.delayedBenefitAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">جریمه پرداختی:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.payedFromPenalty.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.payedFromPenalty">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">پرداختی قبل از سررسید:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.beforeOfMatureAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.beforeOfMatureAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">پرداختی در سررسید:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.matureAmount }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.matureAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">آخرین پرداخت:</span>
        <span class="font-0-8 text-dark">{{ lastDebtData.loanAccModelTotal?.lastPayDateFa }}</span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">پرداختی بعد از سررسید:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.afterOfMatureAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.afterOfMatureAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">پرداختی سررسید گذشته:</span>
        <span class="font-0-8 text-dark"> --- </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">پرداختی معوق:</span>
        <span class="font-0-8 text-dark"> --- </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">پرداختی مشکوک‌الوصول:</span>
        <span class="font-0-8 text-dark"> --- </span>
      </div>

    </div>

    <div class="font-0-9 w-100 text-white bg-black-2 p-2 text-center mt-3 rounded-2">تعهدات</div>
    <div class="row m-0" v-if="lastDebtData">

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مبلغ مانده تعهدات:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.remainAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.remainAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مانده تعهدات از اصل:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.remainFromAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.remainFromAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مورد انتظار وصول:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.visionAmount.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.visionAmount">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-blue-8 rounded-2">
        <span class="font-0-8">مانده تعهدات از سود:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.remainFromProfit.toLocaleString() }}
          <span class="font-0-8 text-dark" v-if="lastDebtData.loanAccModelTotal?.remainFromProfit">ریال</span>
        </span>
      </div>

      <div class="d-flex justify-content-between col-md-3 col-sm-12 border-1 border p-2 bg-white rounded-2">
        <span class="font-0-8">مانده تعهد از کارمزد معطلی:</span>
        <span class="font-0-8 text-dark">
          {{ lastDebtData.loanAccModelTotal?.totalRemainWaitProfitAmount.toLocaleString() }}
          <span class="font-0-8 text-dark"
                v-if="lastDebtData.loanAccModelTotal?.totalRemainWaitProfitAmount">ریال</span>
        </span>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {loanStore} from "~/store/loan-store";
import type {LoanDetail} from "~~/core/models/loan/loan-detail";
import EffectiveDate from "./EffectiveDate.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});
const store = loanStore();
const lastDebtData = ref<LoanDetail>();
const loanDailyFilter = ref({
  branches: [],
  documentTypeIdList: [],
  effectivDateFa: '',
  loanID: props.loanId,
  loanMinorTypeDto: {},
  pageNumber: 1,
  take: 10
});

const loanUpdateFilter = ref({
  branches: [],
  branchCode: 0,
  customerNumber: 0,
  loanMinorTypeId: 0,
  loanNumber: '',
  loanSerial: 1,
  documentTypeIdList: [],
  effectivDateFa: '',
  loanID: props.loanId,
  loanMinorTypeDto: {},
  pageNumber: 1,
  take: 10
});

const getTotalLoanDetail = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanDetailById(props.loanId), true, result => {
    if (result.result) {
      lastDebtData.value = result.result;
    }
  });
}

const getDateTime = (data: string) => {
  loanDailyFilter.value.effectivDateFa = data;
  MakeResponse.makeServerResponse(LoanDocsService.getLoanDailyQuery(loanDailyFilter.value), true, result => {
    if (result.result) {
      lastDebtData.value.loanAccModelTotal = result.result;
    }
  });
}

const onUpdate = (data: string) => {
  loanUpdateFilter.value.effectivDateFa = data;
  loanUpdateFilter.value.branchCode = lastDebtData.value?.branchCode ? lastDebtData.value?.branchCode : 0;
  loanUpdateFilter.value.loanNumber = lastDebtData.value?.loanNumber ? lastDebtData.value?.loanNumber : '';
  loanUpdateFilter.value.loanSerial = lastDebtData.value?.loanSerial ? lastDebtData.value?.loanSerial : 0;
  loanUpdateFilter.value.customerNumber = lastDebtData.value ? lastDebtData.value.customerNumber : 0;
  MakeResponse.makeServerResponse(LoanDocsService.updateLoanDailyQuery(loanUpdateFilter.value), true, result => {
    if (result.result) {
      ToastNotificationService.success('عملیات با موفقیت انجام شد');
    }
  });
}

onMounted(() => {
  getTotalLoanDetail();
})

</script>

<style scoped>

</style>