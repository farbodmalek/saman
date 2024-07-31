  <template>
  <div class="row mt-3">
    <div class="form-group col-md-6 col-sm-12">
      <label>عنوان رشته فعالیت</label>
      <Dropdown
          filter
          show-clear
          @filter="getPlanList($event.value)"
          v-model="form.planNoId"
          @change="onGetOtherPlans($event.value)"
          option-label="name"
          option-value="id"
          :options="planNoList"
          class="w-100"
          :class="{'p-invalid': submitted && v$.planNoId.$invalid}"/>
    </div>

    <div class="col-md-6 col-sm-12" v-if="form.planNoId === 11984">
      <label>سایر عناوین رشته</label>
      <InputText
          v-model="form.userPlanNoText"
          class="w-100"/>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-success" @click="onSubmit()">ثبت</button>
      <button class="btn btn-danger me-2" @click="reject()">انصراف</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {CommonService} from "~/services/common-service";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";

const planNoList = ref<any[]>([]);
const dialogRef = inject('dialogRef');
const submitted = ref<boolean>(false);
const params = ref();
const form = reactive({
  userPlanNoText: null,
  userOtherPlanNo: 0,
  loanId: null,
  planNoId: null
});
const rules = computed(() => {
  return {
    planNoId: {required}
  }
})

const v$ = useVuelidate(rules, form);


const getPlanList = (name: string = '') => {
  const body = {pageNumber: 1, name: name}
  MakeResponse.makeServerResponse(CommonService.getPlanNoList(body), true, result => {
    if (result.results) {
      planNoList.value = result.results;
    }
  });
}

const onGetOtherPlans = (id: number) => {
}

const onSubmit = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(CommonService.setPlanNo(form), true, result => {
      if (result.result) {
        ToastNotificationService.success('عنوان جدید ثبت شد');
        reject(true);
      }
    });
  }
}

const reject = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  params.value = dialogRef.value.data;
  form.loanId = params.value.id;
  getPlanList();
  form.userOtherPlanNo = +BasePage.getLoggedUser().id;
});
</script>

<style scoped>

</style>