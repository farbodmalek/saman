<template>
  <div class="">

    <div class="mb-2">
      <button class="btn btn-primary fw-normal" @click="setDefinition()">ایجاد دسترسی</button>
    </div>

    <table-container
        :hasPagination="false"
        :totalRows="totalRows"
        :listData="menuList"
        :columns="columns">
    </table-container>
  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../../components/tabel/TableContainer.vue";
import {ManagementService} from "~/services/management-service";
import {MakeResponse} from "~/composables/make-response";
import NewDefinition from "../../../pagesComponents/security/NewDefinition.vue";
import {useDialog} from "primevue/usedialog";

const filter = ref({
  take: 100,
  pageNumber: 1,
  isMenu: true
});
const visible = ref(false);
const totalRows = ref(0);
const menuList = ref();
const columns = ref([
  {
    header: 'کد ولد',
    field: 'parentId',
  },
  {
    header: 'کد اولویت مرتب سازی',
    field: 'order',
  },
  {
    header: 'کد منو',
    field: 'code',
  },
  {
    header: 'نام منو',
    field: 'name',
  },
  {
    header: 'عنوان',
    field: 'title',
  },
  {
    header: 'مسیر',
    field: 'path',
  },
  {
    header: 'شرح',
    field: 'description',
  },
  {
    header: 'آیکون',
    field: 'iconClass',
  },
  {
    header: 'فعال/غیر فعال',
    field: 'isActiveDesc',
  },
  {
    header: 'نوع دسترسی',
    field: 'isMenuDesc',
  },
]);
const dialog = useDialog();

const getMenu = () => {
  MakeResponse.makeServerResponse(ManagementService.getMenuDefinition(filter.value), true, result => {
    if (result.results) {
      menuList.value = result.results;
      totalRows.value = result.totalRows;
      menuList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  menuList.value[index].columnActions = [
    {
      piIcon: 'pi pi-pencil',
      style: 'text-primary',
      onClick(row: any) {
        onEdit(row);
      }
    }
  ];
}

const onEdit = (data: any) => {
  dialog.open(NewDefinition, {
    props: {
      header: 'ویرایش دسترسی',
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
        getMenu();
      }
    },
    data: data
  });
}

const setDefinition = () => {
  dialog.open(NewDefinition, {
    props: {
      header: 'تعریف دسترسی جدید',
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
        getMenu();
      }
    },
  });
}

onMounted(() => {
  getMenu();
});

</script>

<style scoped>

</style>