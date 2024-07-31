<template>
  <div class="">

    <div>
      <button class="btn btn-primary fw-normal" @click="registerUser()">فیلتر</button>
    </div>

    <table-container
        @changePage="changePage($event)"
        :take="take"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns"
        :actionName="'اطلاعات تماس '"
    >
    </table-container>

  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../components/tabel/TableContainer.vue";
import {ManagementService} from "~/services/management-service";
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import {useConfirm} from "primevue/useconfirm";
import Address from "../../pagesComponents/customer-doc/Address.vue";

const columns = ref([
  {
    header: 'شماره مشتری',
    field: 'customerNumber',
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
    header: 'شماره ملی',
    field: 'isActive',
  },
  {
    header: 'شماره شناسنامه',
    field: 'idNumber',
  },
  {
    header: 'نام پدر',
    field: 'fatherName',
  },
  {
    header: 'همراه',
    field: 'mobileNo',
  },
  {
    header: 'شهر محل سکونت ',
    field: 'branchName',
  },
  {
    header: 'اطلاعات تماس',
    field: 'mobileNo',
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

const getCustomers = () => {
  MakeResponse.makeServerResponse(ManagementService.getCustomers(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          isActive: p.isActive ? 'فعال' : 'غیر فعال'
        }
      });
      totalRows.value = result.totalRows;
      usersList.value.forEach((p, index) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  usersList.value[index].columnActions = [
    {
      id: 1,
      title: 'اطلاعات تماس',
      piIcon: 'pi pi-map-marker',
      style: 'text-primary',
      onClick(row: any) {
        GetCustomerAddress(row)
      }
    }
  ];
}


const GetCustomerAddress = (data:any) => {
  dialog.open(Address, {
    props: {
      header: 'مشخصات آدرس',
      modal: true,
      style: {
        width: '40%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data.id,
    onClose: (opt) => {
      if (opt && opt.data) {
        getCustomers()
      }
    },
  });
}

const changePage = (event: any) => {
  filter.value = {
    take: event.rows,
    pageNumber: event.page + 1,
  }
  getCustomers();
}

onMounted(() => {
  getCustomers();
});

</script>

<style scoped>

</style>