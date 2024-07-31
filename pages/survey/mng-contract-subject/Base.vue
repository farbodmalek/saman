<template>
  <div>
    <TabMenu :model="items" @tab-change="onChangeTab($event.index)" :active-index="tabId"/>

    <div>
      <Component :is="tabId === 0 ? SelectedByUsers : FieldActivity"></Component>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectedByUsers from "../../../pagesComponents/survey/mng-subject/SelectedByUsers.vue";
import FieldActivity from "../../../pagesComponents/survey/mng-subject/FieldActivity.vue";

const items = ref([
  { label: 'مدیریت عناوین رشته های فعالیت انتخاب شده توسط کاربران', icon: 'pi pi-slack' },
  { label: 'مدیریت عناوین رشته های فعالیت و پرونده ها', icon: 'pi pi-file' }
]);
const tabId = ref<number>(0);

const onChangeTab = (id: number) => {
    tabId.value = id;
  if (id === 0) {
  } else {
  }
}
</script>

<style scoped>

</style>