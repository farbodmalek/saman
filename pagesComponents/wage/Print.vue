<template>
  <div >
    <div class="bg-white p-3">
      <p class="bg-orange-2 p-4" v-if="List">
        * در این بخش فایل چاپی ماه های گذشته را میتوانید دریافت کنید.

        * مواردی که هم اکنون در سربرگ "فهرست ریز حق السعی" جهت پرداخت تایید میکنید برای ماه {{ List.currentMonth }} ثبت خواهد شد.

        * از تاریخ {{ List.fromDate }} تا {{ List.toDate }} می توانید درخواست چاپ موارد تایید شده  را دهید، پس از اتمام
        این مهلت چنانچه درخواست نداده باشید، سیستم بطور خودکار درخواست ثبت کرده و فایل چاپی ماه {{ List.currentMonth }} برای مالی آماده
        دریافت خواهد شد.

        * پس از ثبت درخواست چه از طرف کاربر و چه از طرف سیستم، ویرایش و یا تغییر اطلاعات حق السعی های تایید شده امکان
        پذیر نخواهد بود.
      </p>
      <hr>
      <p class="bg-orange-2 p-4">
    * در صورت اتمام زودتر از موعد کار بررسی و تایید پرداخت حق السعی، می توانید درخواست چاپ ماه {{ List.currentMonth }} دهید.

    * توجه داشته باشید بعد از ثبت درخواست، مواردی که تایید خواهید کرد برای ماه جاری ثبت خواهد شد.

    * این فرآیند قابل بازگشت نیست! لذا در ثبت درخواست دقت کنید تمام موارد لازم را تایید کرده باشید.
  </p>
</div>
    <table-container
        @changePage="changePage($event)"
        :take="take"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns"
        :actionName="''"
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
import Confirmation from "../../pagesComponents/wage/wage-doc/PaymentConfirmation.vue";
import {BasePage} from "~/core/base/base-page"

const columns = ref([

  {
    header: 'ماه پرداخت',
    field: 'strPayMount',
  },
  {
    header: 'سرپرستی',
    field: 'superVisor',
  },
  {
    header: 'کاربر درخواست دهنده',
    field: 'applicantUser',
  },
  {
    header: 'تاریخ درخواست',
    field: 'requestDateFa',
  },
  {
    header: 'وضعیت درخواست',
    field: 'isDeleted',
  },
  {
    header: 'تاریخ نامه',
    field: 'letterDateFa',
  },
  {
    header: 'شماره نامه ',
    field: 'letterNumber',
  },
]);
const filter = ref({
  pageNumber: 1,
    take: 100,
    branches: [],
    filterType: []
});
const usersList = ref();
const totalRows = ref(0);
const take = ref(10);
const dialog = useDialog();
const confirm = useConfirm();
const router =useRouter()
const List= <any>ref([])

const GetWagePaymentList = () => {
  MakeResponse.makeServerResponse(ManagementService.GetWagePaymentList(filter.value), true, result => {
    if (result.results) {
      List.value=result.results
      usersList.value = result.results.wagePaymentItems.map((p: any) => {
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
      title: 'مشاهده و دانلود گزارش پرداخت',
      piIcon: 'pi pi-eye',
      style: 'text-primary',
      onClick(row: any) {
        PrintActorMontly(row)
      }
    }, {
      id: 1,
      title: 'دانلود گزارش پرداخت ',
      piIcon: 'pi pi-download ',
      style: 'text-black',
      onClick(row: any) {
        SaveActorMontlyPdf(row)
      }
    }, {
      id: 1,
      title: 'حذف کردن ',
      piIcon: 'pi pi-trash',
      style: 'text-red-2',
      onClick(row: any) {
        RemoveActorMontly(row)
      }
    }, {
      id: 1,
      title: 'تایید',
      piIcon: 'pi pi-thumbs-up-fill',
      style: 'text-primary',
      onClick(row: any) {
        GetCustomerAddress(row)
      }
    },
  ];
}


const GetCustomerAddress = (data:any) => {

  dialog.open(Confirmation, {
    props: {
      header: 'تایید پرداخت',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data.id,
    onClose: (opt) => {
      if (opt && opt.data) {
        GetWagePaymentList()
      }
    },
  });
}


const PrintActorMontly = (data:any) => {
window.open(`https://samen.karafariniomid.com/mp/printmonthly/${data.id}`,'blank')
}

const SaveActorMontlyPdf  = (data:any) => {
  MakeResponse.makeServerResponse(ManagementService.SaveActorMontlyOperationPdf(data.id), true, result => {
    if (result) {
      BasePage.downloadAsExcel(result,'monthlyReport')
    }
  });
}

const RemoveActorMontly  = (data:any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا مایل به حذف اطلاعات می باشید ؟',
    header: 'حذف کردن ',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      const body = {
        loanId: data.id,
        isPreferencePlan: data.isPreferencePlan
      }
      MakeResponse.makeServerResponse(ManagementService.RemovePrintMontlyRequest(data.id), true, result => {
        if (result) {
          GetWagePaymentList();
        }
      });
    }
  });

}

const changePage = (event: any) => {
  filter.value = {
    take: event.rows,
    pageNumber: event.page + 1,
  }
  GetWagePaymentList();
}

onMounted(() => {
  GetWagePaymentList();
});

</script>

<style scoped>

</style>