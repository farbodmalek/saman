<template>
  <div >
    <TableTwoRow title=" اطلاعات تماس" :data-table="info" class="mt-3 m-auto"/>
<!--      <div class="d-flex justify-content-end">-->
<!--        <button class="btn btn-danger me-3" @click="reject()">انصراف</button>-->
<!--      </div>-->
  </div>
</template>

<script setup lang="ts">
import {MakeResponse} from "~/composables/make-response";
import {ManagementService} from "~/services/management-service";
import {loanStore} from "~/store/loan-store";
import TableTwoRow from "../../../components/tabel/TableTwoRow.vue";

const dialogRef = inject('dialogRef');
const params = ref();
const info = ref<any[]>([]);
const store = loanStore();
const List = ref<any[]>([]);

const GetCustomerAddressByNumber = (id:any) => {
  MakeResponse.makeServerResponse(ManagementService.GetCustomerAddressByNumber(id), true, result => {
    if (result.results) {
      List.value = result.results[0];
    }
  });
}

watch(List, (data) => {
  info.value = [
    {
      label: 'نوع آدرس :',
      value: data.customerAddressTypeDesc
    },
    {
      label: 'موبایل:',
      value: data.phone
    },
    {
      label: 'تلفن:',
      value: data.mobile,
    },   {
      label: 'آدرس:',
      value: data.address,
    },
  ];
});


const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  params.value = dialogRef.value.data;
  GetCustomerAddressByNumber(params.value);
});
</script>

<style scoped>

</style>