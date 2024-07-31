<template>
  <div class="p-2">
    <TableTwoRow title="اطلاعات تماس" :data-table="addInfo"/>
  </div>
</template>

<script lang="ts" setup>
import TableTwoRow from "../../../../components/tabel/TableTwoRow.vue";
import {LoanDocsService} from "~/services/loan-docs-service";

const addInfo = ref<any[]>([]);
const dialogRef = inject<any>('dialogRef');

const getAddress = (id: number) => {
  MakeResponse.makeServerResponse(LoanDocsService.getGuarantorAddress(id), true, result => {
    if (result.result) {
      for (let i in result.result.customerAddresses) {
        getColumnTitle(result.result.customerAddresses[i]);
      }
    }
  });
}

const getColumnTitle = (add: any) => {
  addInfo.value.push(
      {
        label: 'نوع آدرس',
        value: add.customerAddressTypeDesc
      },
      {
        label: 'موبایل',
        value: add.mobile
      },
      {
        label: 'تلفن',
        value: add.phone
      },
      {
        label: 'کد پستی',
        value: add.postalCode
      },
      {
        label: 'آدرس',
        value: add.address ? add.address
            : add.addressLine1 ? add.addressLine1
                : add.addressLine2 ? add.addressLine2
                    : add.addressLine3
      }
  );
}

onMounted(() => {
  getAddress(dialogRef.value.data);
})
</script>

<style scoped>

</style>