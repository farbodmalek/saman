<template>
  <div class="">
      <TabMenu :model="menuItems" :active-index="tabIndex" class="wage-tab">
        <template #item="{ item, props }" >
          <a class="p-menuitem-link " @click="changeTab(item.id)">
            <span class="p-menuitem-text text-center">{{ item.label }}</span>
          </a>
        </template>
      </TabMenu>

    <table-container
        @changePage="changePage($event)"
        :take="take"
        :listData="usersList"
        :totalRows="totalRows"
        :columns="columns"
        :actionName="''"
        :hasAction="false"
        :scrollable="true"
        :scrollHeight="650">
    </table-container>

  </div>
</template>

<script setup lang="ts">
import TableContainer from "../../components/tabel/TableContainer.vue";
import {MakeResponse} from "~/composables/make-response";
import {useDialog} from "primevue/usedialog";
import {useConfirm} from "primevue/useconfirm";
import {LoanDocsService} from "~/services/loan-docs-service";

const columns = ref([
  {
    header: 'اقدام کننده',
    field: 'userFullName',
  },
  {
    header: 'ماه پرداخت',
    field: 'paymentMonthName',
  },
  {
    header: 'سال پرداخت',
    field: 'paymentYear',
  },
  {
    header: 'تعداد ارجاعات',
    field: 'actorCount',
  },
  {
    header: 'بدهی وصولی',
    field: 'collectedAmount',
  },
  {
    header: 'مبلغ حق السعی',
    field: 'wageAmount',
  },
  {
    header: 'دریافتی از مشتری',
    field: 'amount',
  },
  {
    header: 'هزینه صندوق',
    field: 'bankCost',
  },
]);
const filter = ref({
  pageNumber: 1,
  take: 100,
  branches: [],
});
const usersList = ref();
const totalRows = ref(0);
const take = ref(10);
const dialog = useDialog();
const confirm = useConfirm();
const router =useRouter()
const menuItems = ref<any[]>([
  {id: 1, label: 'اقدام کننده', path: `referencelist`},
  {id: 2, label: 'شعبه', path: `print`},
  {id: 3, label: 'سرپرستی', path: `referencelist`},
]);


const GetActorAggregatedWage = () => {
  MakeResponse.makeServerResponse(LoanDocsService.GetActorAggregatedWage(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          isActive: p.isActive ? 'فعال' : 'غیر فعال'
        }
      });
      totalRows.value = result.totalRows;

    }
  });
}
const GetBranchAggregatedWage = () => {
  MakeResponse.makeServerResponse(LoanDocsService.GetBranchAggregatedWage(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          isActive: p.isActive ? 'فعال' : 'غیر فعال'
        }
      });
      totalRows.value = result.totalRows;

    }
  });
}

const GetSupervisorAggregatedWage = () => {
  MakeResponse.makeServerResponse(LoanDocsService.GetSupervisorAggregatedWage(filter.value), true, result => {
    if (result.results) {
      usersList.value = result.results.map((p: any) => {
        return {
          ...p,
          isActive: p.isActive ? 'فعال' : 'غیر فعال'
        }
      });
      totalRows.value = result.totalRows;

    }
  });
}

const changeTab = (item: number) => {
  if (item == 1) {
    columns.value[0].header="اقدام کننده "
    columns.value[0].field="branchName"
    GetActorAggregatedWage()
  } else if (item == 2) {
    columns.value[0].header="شعبه "
    columns.value[0].field="branchName"
    GetBranchAggregatedWage()
  } else if (item == 3) {
    columns.value[0].header="سرپرستی "
    columns.value[0].field="supervisorName"
    GetSupervisorAggregatedWage()
  }
}



const changePage = (event: any) => {
  filter.value = {
    take: event.rows,
    pageNumber: event.page + 1,
  }
  GetActorAggregatedWage();
}

onMounted(() => {
  GetActorAggregatedWage();
});

</script>

<style scoped>

</style>