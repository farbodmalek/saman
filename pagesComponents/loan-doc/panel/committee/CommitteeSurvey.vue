<template>
  <div>
    <div class="">
      <button class="btn btn-primary" type="button" @click="onSetCommitment()">
        <span>جدید</span>
        <i class="pi pi-plus"></i>
      </button>
    </div>

    <div>
      <TableContainer
          :has-pagination="false"
          :has-action="false"
          :total-rows="totalRows"
          :columns="columnTitle"
          :page-number="pageNumber"
          :take="take"
          :list-data="commitmentList">
      </TableContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";
import type {CommitmentSurvey} from "~~/core/models/loan/commitment-survey";
import Set from './Set.vue'
import {useDialog} from "primevue/usedialog";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});
const pageNumber = ref<number>(1);
const take = ref<number>(100);
const totalRows = ref<number>(0);
const commitmentList = ref<CommitmentSurvey[]>([]);
const dialog = useDialog();
const columnTitle = [
  {
    header: 'وضعیت طرح',
    field: 'planActivationType'
  },
  {
    header: 'تاریخ نظارت',
    field: 'surveyDateFa'
  },
  {
    header: 'تعداد اشتغال تعهد شده',
    field: 'numberOfJobsObligated',
    isCurrency: true
  },
  {
    header: 'تعداد اشتغال ایجاد شده',
    field: 'numberOfJobsCreated',
    isCurrency: true
  },
  {
    header: 'تعداد افراد بیمه شده',
    field: 'numberOfInsurdPerson',
    isCurrency: true
  },
];
const filter = reactive({
  branches: [],
  loanId: props.loanId,
  pageNumber: 1,
  take: 10
});


const getCommitteeList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getCommitteeSurvey(filter), true, result => {
    if (result.results) {
      commitmentList.value = result.results;
    }
  });
}

const onSetCommitment = () => {
  dialog.open(Set, {
    props: {
      header: 'ثبت نظارت کمیته جدید',
      modal: true,
      style: {
        width: '90%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: props.loanId,
    onClose: (opt) => {
      if (opt && opt.data) {
        getCommitteeList();
      }
    },
  });
}

onMounted(() => {
  getCommitteeList();
});
</script>

<style scoped>

</style>