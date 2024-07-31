<template>
  <div>
    <div class="" v-if="loanId">
      <TotalDetails :loanDetail="loanDetail"/>
    </div>

    <div class="mt-4">
      <TabMenu :model="menuItems" :active-index="tabIndex">
        <template #item="{ item, props }">
          <a class="p-menuitem-link" @click="changeTab(item.path)">
            <span class="p-menuitem-text">{{ item.label }}</span>
          </a>
        </template>
      </TabMenu>
    </div>

    <div class="mt-2">
      <component :is="selectedComponent" :loanId="loanId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {LoanDetail} from "~~/core/models/loan/loan-detail";
import TotalDetails from "../../../pagesComponents/loan-doc/panel/TotalDetails.vue";
import {LoanDocsService} from "~/services/loan-docs-service";
import {MakeResponse} from "~/composables/make-response";
import TotalDoc from "../../../pagesComponents/loan-doc/panel/TotalDoc.vue";
import Installment from "../../../pagesComponents/loan-doc/panel/customer-installment/Installment.vue";
import {loanStore} from "~/store/loan-store";
import Actions from "../../../pagesComponents/loan-doc/panel/action/Actions.vue";
import SupervisionList from "../../../pagesComponents/loan-doc/panel/accomplished/SupervisionList.vue";
import Enactment from "../../../pagesComponents/loan-doc/panel/Enactment.vue";
import CommitteeSurvey from "../../../pagesComponents/loan-doc/panel/committee/CommitteeSurvey.vue";
import Guarantors from "../../../pagesComponents/loan-doc/panel/guaranty/Guarantors.vue";
import List from "../../../pagesComponents/loan-doc/panel/related/List.vue";

const route = useRoute();
const router = useRouter();
const loanId = ref<number>(0);
const loanDetail = ref<LoanDetail>({} as LoanDetail);
const menuItems = ref<any[]>([
  {id: 0, label: 'اطلاعات جامع پرونده', path: `TotalDoc`},
  {id: 1, label: 'بدهی و اقساط', path: `Installment`},
  {id: 2, label: 'اقدامات انجام شده', path: `Actions`},
  {id: 3, label: 'اقدام کنندگان', path: `Actors`},
  {id: 4, label: 'نظارت های انجام شده', path: 'SupervisionList'},
  {id: 5, label: 'اطلاعات مصوبه', path: 'Enactment'},
  {id: 6, label: 'نظارت های کمیته', path: 'Committee'},
  {id: 7, label: 'ضمانت', path: 'Guarantors'},
  {id: 8, label: 'پرونده های مرتبط', path: 'Related'},
  {id: 9, label: 'انتقال به حقوقی/سابقه', path: ''},
  {id: 10, label: 'گالری تصاویر', path: ''},
  {id: 11, label: 'تاریخچه تغییرات', path: ''},
]);
const selectedComponent = ref();
const tabIndex = ref<number>(0);
const store = loanStore();


const getTotalLoanDetail = () => {
  MakeResponse.makeServerResponse(LoanDocsService.getLoanDetailById(loanId.value), true, result => {
    if (result.result) {
      loanDetail.value = result.result;
      store.setLoanData(loanDetail.value);
    }
  });
}

const changeTab = (item: string) => {
  store.setLoanData(loanDetail.value);
  switch (item) {
    case 'TotalDoc':
      getTotalLoanDetail();
      tabIndex.value = 0;
      selectedComponent.value = TotalDoc;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'TotalDoc'}});
      break;
    case 'Installment':
      tabIndex.value = 1;
      selectedComponent.value = Installment;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Installment'}});
      break;
    case 'Actions':
      tabIndex.value = 2;
      selectedComponent.value = Actions;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Actions'}});
      break;
    case 'SupervisionList':
      tabIndex.value = 4;
      selectedComponent.value = SupervisionList;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'SupervisionList'}});
      break;
    case 'Enactment':
      tabIndex.value = 5;
      selectedComponent.value = Enactment;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Enactment'}});
      break;
    case 'Committee':
      tabIndex.value = 6;
      selectedComponent.value = CommitteeSurvey;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Committee'}});
      break;
    case 'Guarantors':
      getTotalLoanDetail();
      tabIndex.value = 7;
      selectedComponent.value = Guarantors;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Guarantors'}});
      break;
    case 'Related':
      tabIndex.value = 8;
      selectedComponent.value = List;
      router.push({path: `/loan/${loanId.value}`, query: {title: 'Related'}});
      break;
  }
}

onMounted(() => {
  loanId.value = +route.path.split('/')[2];
  changeTab(route.query.title);
  getTotalLoanDetail();
});
</script>

<style scoped>

</style>