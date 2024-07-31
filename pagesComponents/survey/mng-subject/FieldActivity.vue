<template>
  <div class="p-2 bg-white">
    <div class="row align-items-end">
      <div class="col-md-4 col-sm-12 form-group">
        <label>عنوان رشته فعالیت</label>
        <InputText v-model="title"/>
      </div>

      <div class="col-md-2 col-sm-12">
        <button class="btn btn-primary d-flex justify-content-between w-100" @click="filterList()">
          جستجو
          <i class="pi pi-search"></i>
        </button>
      </div>
    </div>
    <TableContainer
        @changePage="paging($event)"
        :take="take"
        :pageNumber="pageNumber"
        :listData="loanSubjectList"
        :totalRows="totalRows"
        :columns="columns">
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import type {LoanSubjects} from "~~/core/models/management/loan-subjects";
import {SurveyService} from "~/services/survey-service";
import TableContainer from "../../../components/tabel/TableContainer.vue";
import {useDialog} from "primevue/usedialog";
import TransformLoanToNewActivity from "./TransformLoanToNewActivity.vue";
import {MakeResponse} from "~/composables/make-response";

const loanSubjectList = ref<LoanSubjects[]>([]);
const totalRows = ref<number>(0);
const take = ref<number>(100);
const pageNumber = ref<number>(1);
const title = ref<string>('');
const dialog = useDialog();
const columns = ref([
  {
    header: 'عنوان رشته',
    field: 'planNoName'
  },
  {
    header: 'کد رشته',
    field: 'planNoId'
  },
  {
    header: 'تعداد وام ها',
    field: 'loanCount'
  },
  {
    header: 'تاریخ ایجاد',
    field: 'createDate'
  },
  {
    header: 'کاربر ایجاد کننده',
    field: 'createBy'
  },
]);
const filter = ref({
  branches: [],
  pageNumber: "1",
  name: '',
  take: 100
});

const filterList = () => {
  filter.value.name = title.value;
  getLoanSubjectList();
}

const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = +filter.value.pageNumber;
  getLoanSubjectList();
}

const getLoanSubjectList = () => {
  MakeResponse.makeServerResponse(SurveyService.getLoanSubjectList(filter.value), true, result => {
    if (result.results) {
      loanSubjectList.value = result.results;
      totalRows.value = result.totalRows;
      loanSubjectList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  loanSubjectList.value[index].columnActions = [
    {
      id: 1,
      piIcon: 'pi pi-refresh',
      style: 'text-primary',
      title: 'انتقال وام ها به رشته فعالیت جدید',
      onClick(row: any) {
        onTransformLoans(row);
      }
    }
  ];
}

const onTransformLoans = (data: LoanSubjects) => {
  dialog.open(TransformLoanToNewActivity, {
    props: {
      header: 'انتقال وام ها به رشته فعالیت جدید',
      modal: true,
      style: {
        width: '40%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
    onClose: (opt) => {
      if (opt && opt.data) {
        getLoanSubjectList();
      }
    },
  });
}

onMounted(() => {
  getLoanSubjectList();
})
</script>

<style scoped>

</style>