<template>
  <div>
    <template v-if="showAddRole">
      <div class="row align-items-end mt-3">
        <div class="col-md-5 col-sm-12">
          <label>عنوان نقش</label>
          <Dropdown
              :options="roleList"
              show-clear
              filter
              option-label="roleDesc"
              option-value="id"
              v-model="userRoleId"
              class="w-100"/>
        </div>

        <div class="col-md-3 col-sm-12 d-flex">
          <button type="button" @click="onSubmit()" class="btn btn-success fw-normal w-100 mb-1">ثبت</button>
          <button type="button" @click="showAddRole = !showAddRole" class="btn btn-danger fw-normal w-100 mb-1 me-2">انصراف</button>
        </div>
      </div>
    </template>

    <div>

      <div class="mt-2" v-if="userRoleList && userRoleList.length === 0">
        <button :class="showAddRole ? 'btn-danger' : 'btn-primary'"
                class="btn fw-normal"
                @click="addRole()">
          {{ !showAddRole ? 'افزودن نقش جدید' : 'بستن' }}
        </button>
      </div>

      <table-container
          :hasPagination="false"
          :listData="userRoleList"
          :totalRows="totalRows"
          :columns="columns">
      </table-container>
    </div>

    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../components/tabel/TableContainer.vue";
import {CommonService} from "~/services/common-service";
import {ManagementService} from "~/services/management-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useConfirm} from "primevue/useconfirm";
import {MakeResponse} from "~/composables/make-response";

const dialogRef = inject('dialogRef');
const totalRows = ref(0);
const showAddRole = ref(false);
const userRoleId = ref(null);
const userRoleList = ref();
const roleList = ref();
const columns = ref([
  {
    header: 'عنوان نقش',
    field: 'roleDesc',
  }
]);
const params = dialogRef.value.data;
const confirm = useConfirm();


const getUserRole = (id: number) => {
  MakeResponse.makeServerResponse(ManagementService.getUserRole(id), true, result => {
    if (result.results) {
      userRoleList.value = result.results;
      totalRows.value = result.totalRows;
      userRoleList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  userRoleList.value[index].columnActions = [
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
    showAddRole.value = true;
    userRoleId.value = data.roleId;
    getAllRoles();
  }
}

const onDelete = (id: number, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از حذف نقش اطمینان دارید؟',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-danger p-button-outlined p-button-sm',
    acceptClass: 'p-button-success p-button-outlined p-button-sm',
    rejectLabel: 'انصراف',
    acceptLabel: 'حذف',
    accept: () => {
      MakeResponse.makeServerResponse(ManagementService.deleteUserRole(id), false, result => {
        if (result.result) {
          ToastNotificationService.success('حذف نقش با موفقیت انجام شد');
          getUserRole(params);
        }
      });
    },
    reject: () => {

    }
  });
}

const addRole = () => {
  showAddRole.value = !showAddRole.value;
  if (showAddRole.value)
    getAllRoles();
  else
    userRoleId.value = null;
}

const getAllRoles = () => {
  MakeResponse.makeServerResponse(CommonService.getAllUserRoles(), true, result => {
    if (result.results) {
      roleList.value = result.results;
    }
  });
}

const onSubmit = () => {
  if (userRoleList.value && userRoleList.value.length > 0) {
    ToastNotificationService.warn('برای کاربر فوق قبلا نقش تعریف شده و شما قادر به تعریف نقش جدید نمی باشید.')
  } else {
    const body = {
      roleId: MakeResponse.getLoggedUserInfo() ? MakeResponse.getLoggedUserInfo().id : null,
      userId: userRoleId.value
    }
    MakeResponse.makeServerResponse(ManagementService.userSetRole(body), true, result => {
      if (result.result) {
        ToastNotificationService.success('ثبت نقش با موفقیت انجام شد');
        getUserRole(params);
        userRoleId.value = null;
        showAddRole.value = false;
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  }
}

onMounted(() => {
  getUserRole(params);
});

</script>

<style scoped>

</style>