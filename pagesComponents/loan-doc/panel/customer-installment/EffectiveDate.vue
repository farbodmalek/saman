<template>
  <div class="bg-white">
    <div class="font-0-9 w-100 text-white bg-black-2 p-2">تاریخ موثر</div>

    <div class="row align-items-center">
      <div class="col-md-3 col-sm-12 form-group">
        <label class="pe-2 pt-2">تاریخ موثر</label>
        <DatePicker v-model="date" class="pe-2 w-100"/>
      </div>

      <div class="col-md-1 col-sm-12 mt-4">
        <button class="border-0 bg-transparent" @click="onEmitDate()" v-tooltip="'تاریخ موثر'">
          <i class="pi pi-check p-1 bg-green-3 text-white rounded-2"></i>
        </button>

        <button class="border-0 bg-transparent" @click="onReloadData()" v-tooltip="'محاسبه تاریخ گذشته'"
                v-if="BasePage.hasPermission(ActivitiesEnum.refreshLoanDaily)">
          <i class="pi pi-sync p-1 bg-purple-2 text-white rounded-2"></i>
        </button>
      </div>

      <div class="col-md-7 col-sm-12">
        <p class="font-0-8">* تاریخ موثر بر روی <b>فهرست اقساط، بازپرداختی مشتری، پرداختی بانک، آخرین وضعیت بدهی</b> تاثیر خواهد داشت.</p>
        <p class="font-0-8">* با کلیک بر روی تاریخ های آبی رنگ میتوانید سریعا به تاریخ موثر مورد نظر بروید.</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {BasePage} from "~/core/base/base-page";
import {ActivitiesEnum} from "~/core/models/common/activities.enum";
import DatePicker from "../../../../components/DatePicker.vue";

const emit = defineEmits(['dateTime', 'reload'])
const date = ref<string>('');

const onEmitDate = () => {
  emit('dateTime', date.value);
}

const onReloadData = () => {
  emit('reload', date.value);
}
</script>

<style scoped>

</style>