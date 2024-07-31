<template>
  <div>
    <template v-if="showAddBranch">
      <div class="row align-items-end mt-3">
        <div class="col-md-5 col-sm-12">
          <label>شعبه</label>
          <Dropdown
              :options="branchList"
              show-clear
              filter
              option-label="branchName"
              option-value="id"
              v-model="userBranchId"
              class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 d-flex">
          <button type="button" @click="onSubmit()" class="btn btn-success fw-normal w-100 mb-1">ثبت</button>
          <button type="button" @click="showAddBranch = !showAddBranch"
                  class="btn btn-danger fw-normal w-100 mb-1 me-2">انصراف
          </button>
        </div>
      </div>
    </template>

    <div>

      <div class="mt-2" v-if="userBranchList && userBranchList.length === 0">
        <button :class="showAddBranch ? 'btn-danger' : 'btn-primary'"
                class="btn fw-normal"
                @click="addBranch()">
          {{ !showAddBranch ? 'افزودن شعبه جدید' : 'بستن' }}
        </button>
      </div>

      <table-container
          :hasPagination="false"
          :listData="userBranchList"
          :totalRows="totalRows"
          :columns="columns">
      </table-container>
    </div>

    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "~/components/tabel/TableContainer.vue";
import {CommonService} from "~/services/common-service";
import {ManagementService} from "~/services/management-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useConfirm} from "primevue/useconfirm";
import {MakeResponse} from "~/composables/make-response";

const showAddBranch = ref(false);
const dialogRef = inject('dialogRef');
const totalRows = ref(0);
const userBranchId = ref(null);
const userBranchList = ref();
const branchList = ref();
const columns = ref([
  {
    header: 'نام شعبه',
    field: 'branchName',
  }
]);

const params = dialogRef.value.data;
const confirm = useConfirm();


const getUserBranch = (id: number) => {
  MakeResponse.makeServerResponse(ManagementService.getUserBranch(id), true, result => {
    if (result.results) {
      userBranchList.value = result.results;
      totalRows.value = result.totalRows;
      userBranchList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  userBranchList.value[index].columnActions = [
    {
      id: 1,
      title: 'ویرایش',
      piIcon: 'pi pi-pencil',
      style: 'text-primary',
      onClick(row: any) {
        onEdit(row);
      }
    },
    {
      id: 1,
      title: 'حذف',
      piIcon: 'pi pi-trash',
      style: 'text-danger',
      onClick(row: any) {
        onDelete(row.id, event);
      }
    },
  ]
}

const onEdit = (data: any) => {
  if (data) {
    showAddBranch.value = true;
    userBranchId.value = data.id;
    getAllBranches(data.supervisorCode);
  }
}

const onDelete = (id: number, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از حذف شعبه اطمینان دارید؟',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-danger p-button-outlined p-button-sm',
    acceptClass: 'p-button-success p-button-outlined p-button-sm',
    rejectLabel: 'انصراف',
    acceptLabel: 'حذف',
    accept: () => {
      MakeResponse.makeServerResponse(ManagementService.deleteUserBranch(id), false, result => {
        if (result.result) {
          ToastNotificationService.success('حذف شعبه با موفقیت انجام شد');
          getUserBranch(params);
        }
      });
    },
    reject: () => {

    }
  });
}

const addBranch = () => {
  showAddBranch.value = !showAddBranch.value;
  if (showAddBranch.value)
    getAllBranches(0);
  else
    userBranchId.value = null;
}

const getAllBranches = (branchCode: number) => {
  const body = {
    supervisorCode: branchCode && branchCode > 0 ? branchCode : null,
    pageNumber: "1",
    take: 100
  }
  MakeResponse.makeServerResponse(CommonService.getAllBranches(body), true, result => {
    if (result.results) {
      branchList.value = result.results;
    }
  });
}

const onSubmit = () => {
  if (userBranchList.value && userBranchList.value.length > 0) {
    ToastNotificationService.warn('برای کاربر فوق قبلا نقش تعریف شده و شما قادر به تعریف نقش جدید نمی باشید.')
  } else {
    const body = {
      roleId: MakeResponse.getLoggedUserInfo() ? MakeResponse.getLoggedUserInfo().id : null,
      userId: userBranchId.value
    }
    MakeResponse.makeServerResponse(ManagementService.userSetRole(body), true, result => {
      if (result.result) {
        ToastNotificationService.success('ثبت نقش با موفقیت انجام شد');
        getUserBranch(params);
        userBranchList.value = null;
        showAddBranch.value = false;
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  }
}


onMounted(() => {
  getUserBranch(params)
});

</script>

<style scoped>

</style>