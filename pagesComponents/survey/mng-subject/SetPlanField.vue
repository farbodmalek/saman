<template>
  <div>
    <form @submit.prevent>
      <div class="form-group mt-3">
        <label>عنوان رشته فعالیت</label>
        <Dropdown
            @filter="getPlanNo($event.value)"
            v-model="planId"
            :options="selectedPlanList"
            filter
            option-value="id"
            optionLabel="name"
            placeholder="انتخاب کنید"
            class="w-100">
        </Dropdown>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-success w-25 mt-3" type="button" @click="setPlanNo()">ثبت</button>
        <button class="btn btn-danger me-3 w-25 mt-3" @click="reject()">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {SurveyService} from "~/services/survey-service";
import {MakeResponse} from "~/composables/make-response";

const dialogRef = inject('dialogRef');
const params = ref();

const setPlan = () => {
  // MakeResponse.makeServerResponse(SurveyService.setPlanLoan(), true, result => {
  //
  // })
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}
onMounted(() => {
  params.value = dialogRef.value.data;
})
</script>

<style scoped>

</style>