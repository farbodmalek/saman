<template>
  <div>
    <TableContainer
        :columns="columnTitle"
        :has-header="true"
        :has-pagination="false"
        :page-number="pageNumber"
        :take="take"
        :list-data="actionList">
      <template #header>
        <div class="row justify-content-between align-items-center">
          <div class="col-md-4 col-sm-12">
            <p class="mb-0"> فهرست اقدامات انجام شده روی پرونده</p>
          </div>

          <div class="col-md-4 col-sm-12 row">
            <div class="col-md-5 col-sm-12">
              <button class="btn btn-primary w-100 mb-0 p-2" @click="onSetAction()"
                      v-if="BasePage.hasPermission(ActivitiesEnum.setLoanAction) && store.getLoanData()?.actorsCount > 0">
                <span>افزودن اقدام جدید</span>
                <span><i class="pi pi-plus"></i> </span>
              </button>
            </div>

            <div class="col-md-7 col-sm-12">
              <button class="btn btn-primary mb-0 w-100 p-2" @click="onDownloadReport()">
                <span>دریافت گزارش اقدامات انجام شده</span>
                <span><i class="pi pi-file-excel"></i> </span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </TableContainer>
  </div>
</template>

<script setup lang="ts">
import {MakeResponse} from "~/composables/make-response";
import {LoanDocsService} from "~/services/loan-docs-service";
import type {Actions} from "~~/core/models/loan/actions";
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import {BasePage} from "~/core/base/base-page";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import {useConfirm} from "primevue/useconfirm";
import {useDialog} from "primevue/usedialog";
import {ToastNotificationService} from "~/core/toast-notification-service";
import SetAction from "./SetAction.vue";
import {loanStore} from "~/store/loan-store";

const props = defineProps({
  loanId: {
    type: Number,
    default: 0
  }
});
const actionList = ref<Actions[]>([]);
const pageNumber = ref<number>(1);
const take = ref<number>(10);
const totalRows = ref<number>(0);
const columnTitle = [
  {
    header: 'تاریخ اقدام',
    field: 'actionDateFa'
  },
  {
    header: 'نام اقدام کننده',
    field: 'fullUserName'
  },
  {
    header: 'اقدام انجام شده',
    field: 'actionTypeDesc'
  },
  {
    header: 'پاسخ مدیون(وام گیرنده/ضامن)',
    field: 'description'
  },
];
const confirm = useConfirm();
const dialog = useDialog();
const store = loanStore();

const getLoanActions = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanActions(props.loanId), true, result => {
    if (result.results) {
      actionList.value = result.results;
      actionList.value.forEach((p: Actions, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  actionList.value[index].columnActions = [
    {
      id: 1,
      title: 'ویرایش',
      piIcon: 'pi pi-pencil',
      style: 'text-primary',
      visibility: BasePage.hasPermission(ActivitiesEnum.setLoanAction),
      onClick(row: any) {
        onEdit(row);
      }
    },
    {
      id: 2,
      title: 'حذف',
      piIcon: 'pi pi-trash',
      style: 'text-red-2',
      visibility: BasePage.hasPermission(ActivitiesEnum.removeLoanAction),
      onClick(row: any) {
        onDelete(row, event);
      }
    },
    {
      id: 3,
      title: 'فایل',
      piIcon: 'pi pi-link',
      style: 'text-info',
      onClick(row: any) {
        onGetAttachFile(row);
      }
    },
  ];
}

const onDelete = (data: Actions, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا اطمینان به حذف اقدام دارید؟',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      MakeResponse.makeServerResponse(LoanDocsService.deleteAction(data.id), true, result => {
        if (result.results) {
          getLoanActions();
          ToastNotificationService.success('حذف با موفقیت انجام شد');
        }
      });
    }
  });
}

const onEdit = (data: Actions) => {
  dialog.open(SetAction, {
    props: {
      header: 'ویرایش اقدام',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
    onClose: (opt) => {
      if (opt && opt.data) {
        getLoanActions();
      }
    },
  });
}

const onGetAttachFile = (data: Actions) => {

}

const onSetAction = () => {
  dialog.open(SetAction, {
    props: {
      header: 'ثبت اقدام جدید',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: {
      loanId: props.loanId
    },
    onClose: (opt) => {
      if (opt && opt.data) {
        getLoanActions();
      }
    },
  });
}

const onDownloadReport = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getActionReport(props.loanId), true, result => {
    if (result.result) {

    }
  });
}

onMounted(() => {
  getLoanActions();
});
</script>

<style scoped>

</style>