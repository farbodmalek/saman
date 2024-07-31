<template>
  <div class="row justify-content-between">
    <div class="col-md-6 col-sm-12 mt-2">
      <div>
        <TableTwoRow title="اطلاعات تکمیلی" :data-table="info"/>
      </div>

      <div class="mt-3">
        <TableTwoRow title="آخرین اعلام بدهی" :data-table="lastDebt"/>
      </div>

      <div class="mt-3">
        <TableContainer
            :columns="guarantorColumn"
            :has-header="true"
            :has-pagination="false"
            :list-data="guarantor">
          <template #header>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">اطلاعات ضامنین</p>
            </div>
          </template>
        </TableContainer>
      </div>

      <div class="mt-3">
        <TableContainer
            :columns="reagentColumn"
            :has-header="true"
            :has-action="false"
            :has-pagination="false"
            :list-data="reagentor">
          <template #header>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">اطلاعات معرف ها</p>
            </div>
          </template>
        </TableContainer>
      </div>
    </div>

    <div class="col-md-6 col-sm-12 mt-2">
      <div class="">
        <TableTwoRow title="اطلاعات مشتری" :data-table="customerInfo"/>
      </div>

      <div class="mt-3">
        <TableTwoRow title="اطلاعات تماس" :data-table="addInfo"/>
      </div>

      <div class="mt-3">
        <TableTwoRow title="اطلاعات قرارداد" :data-table="contractInfo"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableTwoRow from "../../../components/tabel/TableTwoRow.vue";
import {loanStore} from "~/store/loan-store";
import TableContainer from "../../../components/tabel/TableContainer.vue";

const store = loanStore();
const info = ref<any[]>([]);
const lastDebt = ref<any[]>([]);
const customerInfo = ref<any[]>([]);
const addInfo = ref<any[]>([]);
const contractInfo = ref<any[]>([]);
const guarantorColumn = ref<any[]>([]);
const guarantor = ref<any[]>([]);
const reagentColumn = ref<any[]>([]);
const reagentor = ref<any[]>([]);

watch(store, (loan) => {
  info.value = [
    {
      label: 'منطقه بانکی',
      value: loan.getLoanData().supervisorName
    },
    {
      label: 'شعبه پرداخت کننده تسهیلات',
      value: loan.getLoanData().branchName
    },
    {
      label: 'مهلت تنفس',
      value: loan.getLoanData().waitDuration,
    },
  ];

  lastDebt.value = [
    {
      label: 'تاریخ محاسبه بدهی',
      value: loan.getLoanData().loanAccModelTotal.effectiveDateFa
    },
    {
      label: 'مبلغ هر قسط',
      value: loan.getLoanData().loanAccModelTotal.eachInstallmentAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'تاریخ اولین قسط',
      value: loan.getLoanData().loanAccModelTotal.firstInstallmentDateFa
    },
    {
      label: 'تاریخ آخرین قسط',
      value: loan.getLoanData().loanAccModelTotal.lastInstallmentDateFa
    },
    {
      label: 'مبلغ تسهیلات پرداخت شده',
      value: loan.getLoanData().loanAccModelTotal.bankPayAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'مبلغ باز پرداخت شده',
      value: loan.getLoanData().loanAccModelTotal.totalRefundAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'مبلغ مورد انتظار وصول',
      value: loan.getLoanData().loanAccModelTotal.visionAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'مبلغ مانده تعهدات',
      value: loan.getLoanData().loanAccModelTotal.remainAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'مطالبات از اصل',
      value: loan.getLoanData().loanAccModelTotal.demandFromMain.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'مطالبات از کارمزد',
      value: loan.getLoanData().loanAccModelTotal.demandFromProfit.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'جریمه تاخیر',
      value: loan.getLoanData().loanAccModelTotal.penaltyAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'تعداد اقساط معوق',
      value: loan.getLoanData().loanAccModelTotal.numberOfDelayedInstallment
    },
    {
      label: 'تاریخ اولین قسط پرداخت نشده',
      value: loan.getLoanData().loanAccModelTotal.firstDelayedInstallmentDateFa
    },
    {
      label: 'تاریخ آخرین قسط پرداخت نشده',
      value: loan.getLoanData().loanAccModelTotal.lastDelayedInstallmentDateFa
    },
    {
      label: 'کل مطالبات (اصل و کارمزد)',
      value: loan.getLoanData().loanAccModelTotal.totalRemainAmount.toLocaleString(),
      extraField: 'ریال'
    },
    {
      label: 'کل مطالبات(اصل و کارمزد و جریمه)',
      value: loan.getLoanData().loanAccModelTotal.totalRemainAmountWithPenalty.toLocaleString(),
      extraField: 'ریال',
      style: 'text-red-2'
    },
    {
      label: 'وضعیت وام',
      value: loan.getLoanData().loanAccModelTotal.loanStatusTypeName
    },
  ];

  customerInfo.value = [
    {
      label: 'شماره مشتری',
      value: loan.getLoanData().customerNumber,
      format: 'action'
    },
    {
      label: 'نام',
      value: loan.getLoanData().firstName,
      format: 'action'
    },
    {
      label: 'نام خانودگی',
      value: loan.getLoanData().lastName,
      format: 'action'
    },
    {
      label: 'جنسیت',
      value: loan.getLoanData().genderDesc
    },
    {
      label: 'نام پدر',
      value: loan.getLoanData().fatherName
    },
    {
      label: 'کد ملی',
      value: loan.getLoanData().nationalNumber
    },
    {
      label: 'ملیت',
      value: loan.getLoanData().nationalityDesc
    },
    {
      label: 'شماره شناسنامه',
      value: loan.getLoanData().idNumber
    },
    {
      label: 'وضعیت تاهل',
      value: loan.getLoanData().marriedDesc
    },
    {
      label: 'سرپرست خانواده',
      value: loan.getLoanData().isFamilySupervisorDesc
    },
    {
      label: 'وضعیت',
      value: loan.getLoanData().isDeathName
    },
  ];

  if (loan.getLoanData() !== null && loan.getLoanData().isCompany) {
    customerInfo.value.push(
        {
          label: 'عنوان شرکت',
          value: loan.getLoanData().lastName
        },
        {
          label: 'شماره مشتری',
          value: loan.getLoanData().customerNumber
        },
        {
          label: 'شناسه ملی',
          value: loan.getLoanData().legalNationalityNumber
        },
        {
          label: 'کد اقتصادی',
          value: loan.getLoanData().legalEconomicCode
        },
        {
          label: 'شماره ثبت',
          value: loan.getLoanData().legalRegistrationNumber
        },
        {
          label: 'محل ثبت',
          value: loan.getLoanData().legalRegistrationLocation
        },
    )
  }

  addInfo.value = [
    {
      label: 'نوع آدرس',
      value: loan.getLoanData().loanCustomerAddressModel[0].customerAddressTypeDesc
    },
    {
      label: 'موبایل',
      value: loan.getLoanData().loanCustomerAddressModel[0].mobile
    },
    {
      label: 'تلفن',
      value: loan.getLoanData().loanCustomerAddressModel[0].phone
    },
    {
      label: 'کد پستی',
      value: loan.getLoanData().loanCustomerAddressModel[0].postalCode
    },
    {
      label: 'آدرس',
      value: loan.getLoanData().loanCustomerAddressModel[0].address ?
          loan.getLoanData().loanCustomerAddressModel[0].address
          : loan.getLoanData().loanCustomerAddressModel[0].addressLine1 ?
              loan.getLoanData().loanCustomerAddressModel[0].addressLine1
              : loan.getLoanData().loanCustomerAddressModel[0].addressLine2 ?
                  loan.getLoanData().loanCustomerAddressModel[0].addressLine2
                  : loan.getLoanData().loanCustomerAddressModel[0].addressLine3
    },
  ];

  contractInfo.value = [
    {
      label: 'شماره قرارداد',
      value: loan.getLoanData().loanNumber
    },
    {
      label: 'تاریخ شروع قرارداد',
      value: loan.getLoanData().beginDateFa
    },
    {
      label: 'تاریخ پایان قرارداد',
      value: loan.getLoanData().endDateFa
    },
    {
      label: 'مبلغ وام',
      value: loan.getLoanData().acceptAmount ? loan.getLoanData().acceptAmount.toLocaleString() : 0,
      extraField: 'ریال'
    },
    {
      label: 'تعداد کل اقساط',
      value: loan.getLoanData().loanAccModelTotal.installmentCount
    },
    {
      label: 'تلفن محل طرح',
      value: loan.getLoanData().loanPlanPhone
    },
    {
      label: 'آدرس محل طرح',
      value: loan.getLoanData().loanPlanAddress
    },
    {
      label: 'نوع سیستم مالی',
      value: 'نگین'
    },
    {
      label: 'نوع قسط',
      value: loan.getLoanData().loanInstallmentTypeDesc
    },
    {
      label: 'نوع تسهیلات',
      value: loan.getLoanData().loanSystemTypeDesc
    },
    {
      label: 'عنوان تسهیلات',
      value: loan.getLoanData().loanMinorTypeDesc
    },
    {
      label: 'نوع طرح وام',
      value: loan.getLoanData().planTypeDesc
    },
    {
      label: 'بخش پرداخت تسهیلات',
      value: loan.getLoanData().loanEconomicTypeDesc
    },
    {
      label: 'عنوان طرح موضوع قرارداد',
      value: loan.getLoanData().planNoDesc
    },
  ];

  guarantorColumn.value = [
    {
      header: 'شماره مشتری',
      field: 'guarantorCustomerNumber'
    },
    {
      header: 'نام',
      field: 'firstName'
    },
    {
      header: 'نام خانوادگی',
      field: 'lastName'
    },
    {
      header: 'کد ملی',
      field: 'nationalNumber'
    },
    {
      header: 'تلفن همراه',
      field: 'mobileNo'
    },
  ];

  guarantor.value = loan.getLoanData().loanGuarantor;

  reagentColumn.value = [
    {
      header: 'شماره مشتری',
      field: 'guarantorCustomerNumber'
    },
    {
      header: 'نام',
      field: 'firstName'
    },
    {
      header: 'نام خانوادگی',
      field: 'lastName'
    },
    {
      header: 'کد ملی',
      field: 'nationalNumber'
    },
    {
      header: 'تلفن همراه',
      field: 'mobileNo'
    },
  ];

  reagentor.value = loan.getLoanData().loanIntroducers;
});

const columnActions = (index: number) => {
  guarantor.value[index].columnActions = [
    {
      id: 1,
      title: 'آدرس',
      piIcon: 'pi pi-map-marker',
      style: 'text-primary',
      onClick(row: any) {

      }
    }
  ];
}

onMounted(() => {
  guarantor.value.forEach((p: any, index: number) => columnActions(index));
});

</script>

<style scoped>

</style>