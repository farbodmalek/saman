<template>
  <div>
    <form @submit.prevent>

      <div class="d-flex ">
        <div class="form-group mt-3 col-4">
          <label>تاریخ بیمه نامه </label>
          <InputText
              v-model="form.letterDateFa"
              class="w-100"

              @filter="getPlanNo($event.value)">
          </InputText>

          <label class="required">شماره نامه </label>
          <InputText
              v-model="form.letterNumber"
              class="w-100">
          </InputText>

        </div>

        <div class="form-group mt-3 col-7 m-auto">
          <label class="required">توضیحات </label>
          <textarea
              v-model="form.description"
              class="w-100"
              placeholder="متن">
        </textarea>
        </div>
      </div>


      <div class="d-flex justify-content-end">
        <button class="btn btn-success w-25 mt-3" type="button" @click="setPrint()">ثبت</button>
        <button class="btn btn-danger me-3 w-25 mt-3" @click="reject()">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ManagementService} from "~/services/management-service";
import {MakeResponse} from "~/composables/make-response";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useConfirm} from "primevue/useconfirm";



const dialogRef = inject('dialogRef');
const confirm = useConfirm();
const params = ref();
const form = reactive({
  description: null,
  letterDateFa: null,
  letterNumber: null,
  printRequestHistoryId: null
})

const rulse = computed(() => {
  return {
    description: {required},
    letterDateFa: {required},
    letterNumber: {required},
  }
})


const $v = useVuelidate(rulse, form)
const setPrint = () => {
  form.printRequestHistoryId = params.value
  if (!$v.value.$invalid) {
    MakeResponse.makeServerResponse(ManagementService.setPrintRequestPayment(form), true, result => {
      if (result.results) {
        ToastNotificationService.success("با موفقیت ثبت شد")
      }
    });
  }else {
    ToastNotificationService.error("فیابد های اجباری را لطفا تکمیل کنید ")
  }
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