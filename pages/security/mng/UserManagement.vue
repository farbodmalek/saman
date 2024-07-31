<template>
  <div class="">

    <div>
      <button class="btn btn-primary fw-normal" @click="registerUser()">تعریف کاربر جدید</button>
    </div>

    <table-container
        @changePage="changePage($event)"
        :take="take"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns">
    </table-container>

<!--    <ConfirmPopup></ConfirmPopup>-->
  </div>
</template>

<script setup lang="ts">
import TableContainer from "~/components/tabel/TableContainer.vue";
import {ManagementService} from "~/services/management-service";
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import DefineUser from "../../../pagesComponents/security/mng/DefineUser.vue";
import Roles from "../../../pagesComponents/security/mng/Roles.vue";
import Branches from "../../../pagesComponents/security/mng/Branches.vue";
import {useConfirm} from "primevue/useconfirm";
import {ToastNotificationService} from "~/core/toast-notification-service";

const columns = ref([
  {
    header: 'نام کاربری',
    field: 'userName',
  },
  {
    header: 'کد ملی',
    field: 'nationalCode',
  },
  {
    header: 'نام',
    field: 'firstName',
  },
  {
    header: 'نام خانوادگی',
    field: 'lastName',
  },
  {
    header: 'وضعیت',
    field: 'isActive',
  },
  {
    header: 'سرپرستی',
    field: 'supervisorName',
  },
  {
    header: 'شعبه',
    field: 'userBranchName',
  },
  {
    header: 'تلفن ثابت',
    field: 'telNumber',
  },
  {
    header: 'تلفن همراه',
    field: 'mobileNumber',
  },
  {
    header: 'تاریخ شروع به کار',
    field: 'startEmploymentDateFa',
  },
  {
    header: 'تاریخ پایان همکاری',
    field: 'endEmploymentDateFa',
  },
]);
const filter = ref({
  take: 10,
  pageNumber: 1
});
const usersList = ref();
const totalRows = ref(0);
const take = ref(10);
const dialog = useDialog();
const confirm = useConfirm();

const getUsers = () => {
  MakeResponse.makeServerResponse(ManagementService.getUsers(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          isActive: p.isActive ? 'فعال' : 'غیر فعال'
        }
      });
      totalRows.value = result.totalRows;
      usersList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  usersList.value[index].columnActions = [
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
      id: 2,
      title: 'نقش ها',
      piIcon: 'pi pi-list',
      style: 'text-dark',
      onClick(row: any) {
        addRole(row);
      }
    },
    {
      id: 3,
      title: 'شعب',
      piIcon: 'pi pi-building',
      style: 'text-primary',
      onClick(row: any) {
        getBranches(row);
      }
    },
    {
      id: 4,
      title: 'تغییر رمز ورود',
      piIcon: 'pi pi-lock-open',
      style: 'text-secondary',
      onClick(row: any) {
        changePass(row, event);
      }
    },
    {
      id: 5,
      title: 'عکس کاربر',
      piIcon: 'pi pi-user',
      style: 'text-secondary',
      onClick(row: any) {
        // onEdit(row);
      }
    },
  ];
}

const onEdit = (data: any) => {
  dialog.open(DefineUser, {
    props: {
      header: 'ویرایش کاربر',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: (opt) => {
      if (opt) {
        getUsers();
      }
    },
    data: data
  });
}

const getBranches = (data: any) => {
  dialog.open(Branches, {
    props: {
      header: `افزودن دسترسی شعب به کاربر ${data.userName}`,
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: (opt) => {
      if (opt) {
        getUsers();
      }
    },
    data: data.id
  });
}

const addRole = (data: any) => {
  dialog.open(Roles, {
    props: {
      header: `افزودن دسترسی نقش ها به کاربر ${data.userName}`,
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: (opt) => {
      if (opt) {
        getUsers();
      }
    },
    data: data.id
  });
}

const registerUser = () => {
  dialog.open(DefineUser, {
    props: {
      header: 'تعریف کاربر جدید',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: (opt) => {
      if (opt) {
        getUsers();
      }
    }
  });
}

const changePass = (data: any, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از تغییر رمز عبور اطمینان دارید؟',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'انصراف',
    acceptLabel: 'تائید',
    accept: () => {
      const body = {
        userId: data.id
      }
      MakeResponse.makeServerResponse(ManagementService.deleteUserBranch(body), false, result => {
        if (result.result) {
          ToastNotificationService.success('تغییر رمز عبور با موفقیت انجام شد');
          getUsers();
        } else {
          ToastNotificationService.error(result.serverErrors[0].hint);
        }
      });
    },
    reject: () => {

    }
  });
}

const changePage = (event: any) => {
  filter.value = {
    take: event.rows,
    pageNumber: event.page + 1,
  }
  getUsers();
}

onMounted(() => {
  getUsers();
});
</script>

<style scoped>

</style>