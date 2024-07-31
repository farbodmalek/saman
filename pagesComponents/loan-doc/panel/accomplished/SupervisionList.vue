<template>
  <div>
    <TableContainer
        @action="getRowAction($event)"
        :has-pagination="false"
        :columns="columnTitle"
        :total-rows="totalRows"
        :page-number="pageNumber"
        :take="take"
        :list-data="accomplishedSurveyList">
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {BasePage} from "~/core/base/base-page";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import {useConfirm} from "primevue/useconfirm";
import {useDialog} from "primevue/usedialog";
import AccomplishedDetail from "./AccomplishedDetail.vue";
import SurveyUserInfo from "./SurveyUserInfo.vue";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});

const accomplishedSurveyList = ref<any[]>([]);
const pageNumber = ref<number>(1);
const take = ref<number>(100);
const totalRows = ref<number>(0);
const confirm = useConfirm();
const dialog = useDialog();
const supervisionFilter = ref({
  pageNumber: pageNumber.value,
  take: take.value,
  loanId: props.loanId,
  branches: [],
});
const columnTitle = [
  {
    id: 1,
    header: 'ارجاع دهنده',
    field: 'referenceUserName',
    format: 'action'
  },
  {
    id: 2,
    header: 'کارشناس ناظر',
    field: 'surveyUserName',
    format: 'action'
  },
  {
    header: 'زمان ارجاع به کارشناس',
    field: 'referenceDateTime'
  },
  {
    header: 'زمان ثبت نظارت',
    field: 'surveyDateTime'
  },
  {
    header: 'مرحله نظارت',
    field: 'cartableStatusTypeName',
  },
  {
    header: 'بخش پرداخت تسهیلات',
    field: 'facilitiesPart',
  },
];

const getSuperVisionList = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getSupervisionSurveyList(supervisionFilter.value), true, result => {
    if (result.results) {
      accomplishedSurveyList.value = result.results.filter((p: any) => p.cartableStatusTypeId !== 0).map((p: any) => {
        return {
          ...p,
          surveyType: p.surveyType === 0 ? 'نظارت کمیته شده' : p.surveyType === 1 ? ' نظارت انجام شده' : null,
          surveyDateTime: p.surveyDateTime + ' - ' + p.surveyDateFa,
          referenceDateTime: p.referenceDateTime + ' - ' + p.referenceDateFa,
        }
      });
      accomplishedSurveyList.value.forEach((p, index) => columnAction(index));
    }
  });
}

const columnAction = (index: number) => {
  accomplishedSurveyList.value[index].columnActions = [
    {
      id: 1,
      title: 'نمایش جزئیات',
      piIcon: 'pi pi-file',
      style: 'text-primary',
      onClick(row: any) {
        onshowDetail(row);
      }
    },
    {
      id: 2,
      title: 'حذف نظارت',
      piIcon: 'pi pi-trash',
      style: 'text-red-2',
      visibility: BasePage.hasPermission(ActivitiesEnum.RemoveCartable) && accomplishedSurveyList.value[index].cartableStatusTypeId === 1,
      onClick(row: any) {
        onDelete(row);
      }
    },
  ];
}

const getRowAction = (row: any) => {
  if (row.col.id === 1) {
    getUserSurveyInfo(row.data.surveyReferenceUserListModel, 1);
  } else if (row.col.id === 2) {
    getUserSurveyInfo(row.data.surveySurveyUserListModel, 2);
  }
}

const getUserSurveyInfo = (data: any, type: number) => {
  dialog.open(SurveyUserInfo, {
    props: {
      header: type === 1 ? 'مشخصات کاربر ارجاع دهنده' : 'مشخصات کاربر ناظر',
      modal: true,
      style: {
        width: '90%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
  });
}

const onshowDetail = (data: any) => {
  dialog.open(AccomplishedDetail, {
    props: {
      header: 'جزئیات نظارت',
      modal: true,
      style: {
        width: '90%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
    onClose: (opt) => {
      if (opt && opt.data) {
        getSuperVisionList();
      }
    },
  });
}

const onDelete = (data: any) => {

}

onMounted(() => {
  getSuperVisionList();
});
</script>

<style scoped>

</style>