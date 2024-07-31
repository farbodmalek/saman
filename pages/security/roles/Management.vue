<template>
  <div class="">
    <table-container
        :listData="roleList"
        :columns="columns">
    </table-container>

    <template v-if="visible">
<!--      <new-definition @close="onCloseDefinition()" @saveForm="onSaveData($event)"></new-definition>-->
    </template>
  </div>
</template>

<script setup lang="ts">

import {MakeResponse} from "~/composables/make-response";
import {ManagementService} from "~/services/management-service";
import TableContainer from "~/components/tabel/TableContainer.vue";
import {useDialog} from "primevue/usedialog";

const filter = ref({
  take: 100,
  pageNumber: 1,
  isMenu: true
});
const visible = ref(false);
const roleList = ref();
const columns = ref([
  {
    header: 'عنوان نقش',
    field: 'roleName',
  },
  {
    header: 'شرح',
    field: 'roleDesc',
  }
]);
const dialog = useDialog();

const getRoleManagement = () => {
  MakeResponse.makeServerResponse(ManagementService.roleManagement(filter.value), true, result => {
    if (result.results) {
      roleList.value = result.results;
      roleList.value.forEach((p: any, index: number) => columnActions(index));
    }
  });
}

const columnActions = (index: number) => {
  roleList.value[index].columnActions = [
    {
      piIcon: 'pi pi-pencil',
      style: 'text-primary',
      onClick() {
        onEdit();
        // visible.value = true;
        // console.log(visible.value)
      }
    },
    {
      piIcon: 'pi pi-trash',
      style: 'text-danger',
      onClick() {
        visible.value = true;
      }
    },
    {
      piIcon: 'pi pi-list',
      style: 'text-dark',
      onClick() {
        visible.value = true;
      }
    },
  ];
}

const onEdit = () => {
  // dialog.open()
}

const onCloseDefinition = () => {
  visible.value = false;
}

const onSaveData = (event: any) => {

}

onMounted(() => {
  getRoleManagement();
});
</script>

<style scoped>

</style>