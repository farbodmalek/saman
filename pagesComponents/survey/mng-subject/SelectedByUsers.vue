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
        :has-check-box="true"
        :has-header="true"
        :has-action="false"
        @checked="checked($event)"
        @changePage="paging($event)"
        :take="take"
        :pageNumber="pageNumber"
        :listData="subjectList"
        :totalRows="totalRows"
        :columns="columns">
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-info mb-0" @click="onSetField()" :disabled="selectedItems.length === 0">
            انتخاب رشته فعالیت
          </button>
        </div>
      </template>
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import {SurveyService} from "~/services/survey-service";
import type {SubjectSelectedByUser} from "~~/core/models/management/subject-selected-by-user";
import TableContainer from "../../../components/tabel/TableContainer.vue";
import {useDialog} from "primevue/usedialog";
import SetPlanField from "./SetPlanField.vue";
import {MakeResponse} from "~/composables/make-response";

const dialog = useDialog();
const totalRows = ref(0);
const take = ref(100);
const pageNumber = ref(1);
const selectedItems = ref<number[]>([]);
const showAcceptSelectField = ref<boolean>(false);
const title = ref<string>('');
const subjectList = ref<SubjectSelectedByUser[]>([]);
const columns = ref([
  {
    header: 'شماره قرارداد',
    field: 'loanNumber'
  },
  {
    header: 'تاریخ درخواست',
    field: 'requestDateFa'
  },
  {
    header: 'کاربر درخواست کننده',
    field: 'requestUser'
  },
  {
    header: 'عنوان انتخابی کاربر',
    field: 'otherPlanNoName'
  },
  {
    header: 'کاربر تایید کننده',
    field: 'confirmationUser'
  },
  {
    header: 'تاریخ تایید',
    field: 'confirmationDateFa'
  },
  {
    header: 'عنوان تایید شده',
    field: 'confirmedPlanNoName'
  },
]);
const filter = ref({
  branches: [],
  pageNumber: "1",
  planNoName: '',
  take: 100
});

const paging = (pageData: any) => {
  filter.value.pageNumber = pageData.page + 1;
  filter.value.take = pageData.rows;
  take.value = pageData.rows;
  pageNumber.value = +filter.value.pageNumber;
  getPlanNoInfo();
}

const getPlanNoInfo = () => {
  MakeResponse.makeServerResponse(SurveyService.getPlanNoInfoList(filter.value), true, result => {
    if (result.results) {
      subjectList.value = result.results;
      totalRows.value = result.totalRows;
    }
  });
}

const checked = (data: SubjectSelectedByUser[]) => {
  if (data && data.length > 0) {
    selectedItems.value = data.map(p => p.loanId);
    showAcceptSelectField.value = true;
  } else
    showAcceptSelectField.value = false;
}

const filterList = () => {
  filter.value.planNoName = title.value;
  getPlanNoInfo();
}

const onSetField = () => {
  if (selectedItems.value.length > 0) {
    dialog.open(SetPlanField, {
      props: {
        header: 'افزودن عنوان رشته فعالیت',
        modal: true,
        style: {
          width: '40%',
        },
        breakpoints: {
          '640px': '100%'
        },
        draggable: false
      },
      data: selectedItems.value,
      onClose: (opt) => {
        if (opt && opt.data) {
          getPlanNoInfo();
        }
      },
    });
  }
}

onMounted(() => {
  getPlanNoInfo();
})
</script>

<style scoped>

</style>