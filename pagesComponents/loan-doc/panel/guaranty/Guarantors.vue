<template>
  <div class="card">
    <TabView :scrollable="tabItems.length > 6" :activeIndex="tabId" :tabindex="0"
             @tab-change="onChangeTab($event.index)">
      <TabPanel v-for="(item, i) in tabItems" :header="item.title" :key="i">
        <TableContainer
            @action="getColumnAction($event)"
            :list-data="item.id === 1 ? guarantorData : tableData"
            :has-pagination="false"
            :columns="item.id === 1 ? guarantorColumn : tableColumn"
            :has-action="false"/>
      </TabPanel>
    </TabView>
  </div>
</template>

<script lang="ts" setup>
import TableContainer from "../../../../components/tabel/TableContainer.vue";
import type {Guaranty} from "~~/core/models/loan/guaranty";
import {loanStore} from "~/store/loan-store";
import type {ColumnSetting} from "~~/core/models/common/column-setting";
import AddressInfo from "./AddressInfo.vue";
import {useDialog} from "primevue/usedialog";
import {LoanGuarantorTypeEnum} from "~/core/models/enum/loan-guarantor-type.enum";

const tableData = ref();
const tableColumn = ref<ColumnSetting[]>([]);
const guarantorData = ref<Guaranty[]>([]);
const guarantorTypesList = ref();
const storeData = loanStore();
const guarantorColumn = ref<ColumnSetting[]>([]);
const tabId = ref<number>(0);
const dialog = useDialog();
const tabItems = ref([
  {id: 1, title: 'ضامنین'},
  {id: 2, title: 'چک تضمینی', visibility: LoanGuarantorTypeEnum.guarantiescheque},
  {id: 3, title: 'سفته تضمینی', visibility: LoanGuarantorTypeEnum.guarantiesPaper},
  {id: 4, title: 'سپرده سرمایه گذاری', visibility: LoanGuarantorTypeEnum.depositInvestment},
  {id: 5, title: 'اوراق مشارکت', visibility: LoanGuarantorTypeEnum.partnershipDocuments},
  {id: 6, title: 'اموال منقول در رهن بانک', visibility: LoanGuarantorTypeEnum.encumbranceGoods},
  {id: 7, title: 'بیمه نامه اموال در رهن بانک', visibility: LoanGuarantorTypeEnum.insuranceEncumbranceBank},
  {id: 8, title: 'سهام', visibility: LoanGuarantorTypeEnum.equities},
  {id: 9, title: 'چک بابت حق بیمه', visibility: LoanGuarantorTypeEnum.insuranceCheque},
  {id: 10, title: 'ضمانتنامه بانکی', visibility: LoanGuarantorTypeEnum.guarantiesBank},
  {id: 11, title: 'تعهد نامه', visibility: LoanGuarantorTypeEnum.Paperguarantee},
  {id: 12, title: 'ورق مبایعه نامه', visibility: LoanGuarantorTypeEnum.paperPreliminaryAgreement},
  {id: 13, title: 'وکالتنامه', visibility: LoanGuarantorTypeEnum.powerOfAttorney},
  {id: 14, title: 'سند ملکی مبایعه نامه', visibility: LoanGuarantorTypeEnum.landedDocumentAgreement},
  {id: 15, title: 'سند ملکی ترهینی', visibility: LoanGuarantorTypeEnum.bondedLandedDocument},
  {id: 16, title: 'بیمه نامه اعتباری', visibility: LoanGuarantorTypeEnum.insuranceDocumentTrust},
  {id: 17, title: 'اسناد عادی', visibility: LoanGuarantorTypeEnum.normalDocument},
  {id: 18, title: 'سند اجاره به شرط تملیک', visibility: LoanGuarantorTypeEnum.rentPossession},
  {id: 19, title: 'اقرارنامه', visibility: LoanGuarantorTypeEnum.affidavit},
  {id: 20, title: 'عندالمطالبه', visibility: LoanGuarantorTypeEnum.onDemand},
  {id: 21, title: 'غیرمنقول', visibility: LoanGuarantorTypeEnum.immovable},
  {id: 22, title: 'قرارداد داخلی بانک ، متقاضی', visibility: LoanGuarantorTypeEnum.bankAgreement},
  {id: 23, title: 'گواهی کسر از حقوق', visibility: LoanGuarantorTypeEnum.decreaseSalaryPaper},
  {id: 24, title: 'جواز کسب', visibility: LoanGuarantorTypeEnum.businessLicence},
]);

watch(storeData, data => {
  guarantorColumn.value = [
    {header: 'نام ضامن', field: 'firstName'},
    {header: 'نام خانوادگی', field: 'lastName'},
    {header: 'نام پدر', field: 'fatherName'},
    {header: 'کد ملی', field: 'nationalNumber'},
    {header: 'شماره شناسنامه', field: 'idNumber'},
    {id: 1, header: 'مشخصات آدرس', field: '', format: 'action', icon: 'pi pi-eye'},
  ];
  guarantorData.value = data.getLoanData().loanGuarantor;
  guarantorTypesList.value = data.getLoanData().loanCollats;

  getShowTabs(data.getLoanData());
});

const getColumnAction = (col: any) => {
  if (col.col.id === 1) {
    onShowAddressInfo(col.data);
  }
}

const onShowAddressInfo = (data: any) => {
  dialog.open(AddressInfo, {
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
    data: data.guarantorCustomerNumber
  });
}

const onChangeTab = (id: number) => {
  tabId.value = id;
  tableData.value = guarantorTypesList.value.filter(p => {
    return p.collatTypeId === id - 1 ? p : null;
  });
  tableColumn.value = [
    {field: 'loanId', header: 'شماره پرونده'},
    {field: 'collatCost', header: 'ارزش وثیقه', isCurrency: true},
    {field: 'collateEvaluationAmount', header: 'ارزش ترهین', isCurrency: true},
    {field: 'description', header: 'شرح وثیقه'},
  ]
}

const getShowTabs = (data) => {
  tabItems.value = tabItems.value.filter(p => {
    return data.loanCollats.find((x: any) => {
      return p.visibility ? x.collatTypeId === p.visibility : p
    });
  });
}
</script>

<style scoped>

</style>