<template>
  <div class="row p-2 bg-white rounded-3" v-if="loanDetail">
    <div class="col-md-4 col-sm-12">
      <div class="d-flex">
        <p class="font-0-8">شماره قرارداد:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.loanNumber}}</p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">وضعیت پرونده:</p>
        <p class="text-blue-2 me-2 font-0-9" v-if="loanDetail.loanAccModelTotal">
          {{loanDetail.loanAccModelTotal.loanStatusTypeName}}
        </p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">تاریخ آخرین پرداخت:</p>
        <p class="text-green-3 me-2 font-0-9">{{loanDetail.lastPaymentInfoDateFa}}</p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">اقدام کننده:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.lastActorUserName}}</p>
      </div>

    </div>

    <div class="col-md-4 col-sm-12">
      <div class="d-flex">
        <p class="font-0-8">نام وام گیرنده:</p>
        <p class="text-red-2 me-2 font-0-9">{{loanDetail.fullCustomerName}}</p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">مبلغ مانده بدهی:</p>
        <p class="text-red-2 me-2 font-0-9" v-if="loanDetail.loanAccModelTotal">
          {{loanDetail.loanAccModelTotal.remainAmount ?
            loanDetail.loanAccModelTotal.remainAmount.toLocaleString() : 0}}
        </p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">آخرین مبلغ بازپرداخت:</p>
        <p class="text-green-3 me-2 font-0-9">{{loanDetail.lastPaymentInfoAmount ?
            loanDetail.lastPaymentInfoAmount.toLocaleString() : 0}}
        </p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">آخرین اقدام انجام شده:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.lastActionTitle}}</p>
      </div>
    </div>

    <div class="col-md-4 col-sm-12">
      <div class="d-flex">
        <p class="font-0-8">شعبه:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.branchName}}</p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">کل مطالبات (اصل + کارمزد + جریمه):</p>
        <p class="text-red-2 me-2 font-0-9" v-if="loanDetail.loanAccModelTotal">
          {{loanDetail.loanAccModelTotal.totalRemainAmountWithPenalty ?
            loanDetail.loanAccModelTotal.totalRemainAmountWithPenalty.toLocaleString() : 0}}
        </p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">عنوان رشته فعالیت:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.planNoDesc}}</p>
      </div>

      <div class="d-flex mt-3">
        <p class="font-0-8">تاریخ آخرین اقدام:</p>
        <p class="text-blue-2 me-2 font-0-9">{{loanDetail.lastActionDateFa}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {LoanDetail} from "~~/core/models/loan/loan-detail";

const props = defineProps({
  loanDetail: {
    type: Object,
    default: {}
  }
});

const loanDetail = ref<LoanDetail>({} as LoanDetail);



watch(props, (loan) => {
  loanDetail.value = loan.loanDetail;
});
</script>

<style scoped>

</style>