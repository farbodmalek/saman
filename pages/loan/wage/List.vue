<template>
  <div class="">
    <div class="mt-4">
      <TabMenu :active-index="tabIndex-1" :model="menuItems" class="wage-tab">
        <template #item="{ item, props }">
          <a class="p-menuitem-link bg-blue-2" @click="changeTab(item.id)">
            <span class="p-menuitem-text">{{ item.label }}</span>
          </a>
        </template>
      </TabMenu>
    </div>
    <Reference v-if="tabIndex ===1"/>
    <Print v-if="tabIndex ===2"/>
    <Aggregated v-if="tabIndex ===3"/>
  </div>
</template>

<script lang="ts" setup>
import Print from "../../../pagesComponents/wage/Print.vue"
import Reference from "../../../pagesComponents/wage/Reference.vue"
import Aggregated from "../../../pagesComponents/wage/Aggregated.vue"


const tabIndex = ref<number>(1);;



const menuItems = ref<any[]>([
  {id: 1, label: 'فهرست ریز حق السعی ', },
  {id: 2, label: 'چاپ لیست برداخته ماهیانه ', },
  {id: 3, label: 'فهرست حق السعی تجمعی ماهیانه ',},
]);


const changeTab = (item: number) => {
  if (item === 1) {
    tabIndex.value = 1;
  } else if (item === 2) {
    tabIndex.value =2;
  } else if (item === 3) {
    tabIndex.value = 3;
  }
}

</script>

<style scoped>

</style>