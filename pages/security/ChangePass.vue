<template>
  <div class="container-child">
    <form @submit.prevent>
      <div class="row">

        <div class="col-md-4 col-sm-12 form-group">
          <label>کلمه عبور فعلی</label>
          <Password class="w-100" v-model="form.oldPassword" toggleMask />
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>کلمه عبور جدید</label>
          <Password class="w-100" v-model="value" toggleMask />
        </div>

        <div class="col-md-4 col-sm-12 form-group">
          <label>تکرار کلمه عبور جدید</label>
          <Password class="w-100" v-model="value" toggleMask />
        </div>

        <div class="col-md-2 col-sm-12">
          <button class="btn btn-success fw-normal w-100" type="button" @click="onSubmit()">
            تغییر رمز
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

const form = reactive({
  oldPassword: null,
})

const onSubmit = () => {

}
</script>

<style scoped>

</style>