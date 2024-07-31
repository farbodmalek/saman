<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import {LoanDocsService} from "~/services/loan-docs-service";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

const filter = reactive({
  branches: [],
  documentTypeIdList: [],
  loanID: props.loanId,
  loanMinorTypeDto: {},
  pageNumber: 1,
  take: 100
});

const getRelatedList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getRelatedList(filter), true, result => {

  });
}

onMounted(() => {
  getRelatedList();
})
</script>

<style scoped>

</style>