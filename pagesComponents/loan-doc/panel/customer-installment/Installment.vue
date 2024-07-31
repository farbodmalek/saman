<template>
  <div>

    <div class="mt-3">
      <CollectionDetail :loan-id="loanId"/>
    </div>

    <div class="mt-3">
      <CustomerPayed :loan-id="loanId"/>
    </div>

    <div class="mt-3">
      <BankPayed :loan-id="loanId"/>
    </div>

    <div class="mt-3">
      <DebtList :loan-id="loanId"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import CustomerPayed from "./CustomerPayed.vue";
import BankPayed from "./BankPayed.vue";
import DebtList from "./DebtList.vue";
import CollectionDetail from "./CollectionDetail.vue";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

</script>

<style scoped>

</style>