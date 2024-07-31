<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div
              v-for="{title,value,description,icon: { component, background, shape }} of cardData" :key="title"
              class="col-lg-3 col-md-6 col-12">
            <MiniStatisticsCard
                :title="title"
                :value="value"
                :description="description"
                :icon="{
                component: component,
                background: background,
                shape: shape}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MiniStatisticsCard from "../../examples/cards/MiniStatisticsCard.vue";
import {CommonService} from "~/services/common-service";
import {MakeResponse} from "~/composables/make-response";

const time = ref();
const cardData = ref<any[]>([])
const timestamp = ref();
let day = ref<string>('');


const getNowDateTime = () => {
  const today = new Date();
  timestamp.value = new Intl.DateTimeFormat('fa-IR').format(today);
  const options = {weekday: "long"};
  day.value = new Intl.DateTimeFormat("fa-IR", options).format(today)
}

const getData = () => {
  const body = {
    take: 1,
    pageNumber: 1
  }
  MakeResponse.makeServerResponse(CommonService.getDashboardData(body), true, result => {
    if (result.results) {
      cardData.value = [
        {
          title: `تعداد جاری`,
          value: `${result.results[0].currentCount.toLocaleString()}`,
          description: `مبلغ:  ${result.results[0].currentAmount.toLocaleString()} `,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-primary",
            shape: "rounded-circle",
          },
        },
        {
          title: `تعداد سررسید گذشته`,
          value: `${result.results[0].pastOfMatureCount.toLocaleString()}`,
          description: `مبلغ:  ${result.results[0].pastOfMatureAmount.toLocaleString()} `,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-info",
            shape: "rounded-circle",
          },
        },
        {
          title: `تعداد معوق`,
          value: `${result.results[0].delayedBenefitCount.toLocaleString()}`,
          description: `مبلغ:  ${result.results[0].delayedBenefitAmount.toLocaleString()} `,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-warning",
            shape: "rounded-circle",
          },
        },
        {
          title: `تعداد مشکوک الوصول`,
          value: `${result.results[0].doubtfulCount.toLocaleString()}`,
          description: `مبلغ:  ${result.results[0].doubtfulAmount.toLocaleString()} `,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-danger",
            shape: "rounded-circle",
          },
        },
        {
          title: `مطالبات غیر جاری`,
          value: `${result.results[0].notCurrentCount.toLocaleString()}`,
          description: ``,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-danger",
            shape: "rounded-circle",
          },
        },
        {
          title: `جریمه تاخیر`,
          value: `${result.results[0].penaltyAmount.toLocaleString()}`,
          description: ``,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-primary",
            shape: "rounded-circle",
          },
        },
        {
          title: `کل مطالبات`,
          value: `${result.results[0].totalDemand.toLocaleString()}`,
          description: ``,
          icon: {
            component: "ni ni-controller",
            background: "bg-gradient-secondary",
            shape: "rounded-circle",
          },
        },
      ];

      time.value = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format();

      cardData.value.push({
        title: `${time.value}`,
        value: "",
        description: `<div class=""> امروز ${day.value} - ${timestamp.value} </div>`,
        icon: {
          component: "ni ni-controller",
          background: "bg-gradient-primary",
          shape: "rounded-circle",
        },
      });
    }
  });
}

onMounted(() => {
  getData();
  getNowDateTime();
  // cardData.value.splice(7, 1, );
});

</script>
