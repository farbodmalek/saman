<template>
  <NuxtLayout name="authentication">
    <div class="page-header min-vh-100">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7 text-center">
            <img src="/img/signin/KarafariniOmidLogo.png" alt="سامانه الکترونیکی مطالبات و نظارت (سامن)"/>
          </div>

          <div class="text-white text-center">
            سامانه الکترونیکی مطالبات و نظارت (سامن)
          </div>

        </div>
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7 mt-2 card border-0 mb-0">
            <div class="p-2 mt-2 d-flex justify-content-end">
              ورود اعضا
            </div>
            <div class="card-body px-lg-5">
              <form role="form" class="text-start rtl" @submit.prevent="login">
                <div class="mb-3">
                  <ArgonInput
                      v-model="loginForm.username"
                      id="username"
                      type="text"
                      placeholder="نام کاربری"
                      aria-label="username"/>
                </div>
                <div class="mb-3">
                  <ArgonInput
                      v-model="loginForm.password"
                      id="password"
                      type="password"
                      placeholder="رمز عبور"
                      aria-label="Password"/>
                </div>

                <div class="text-center">
                  <ArgonButton
                      color="success"
                      variant="gradient"
                      full-width
                      class="my-4 mb-2 justify-content-center">
                    ورود
                  </ArgonButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {ToastNotificationService} from "~/core/toast-notification-service";
import {SignInService} from "~/services/signIn-service";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  layout: false,
});

const loginForm = ref({
  username: '',
  password: '',
});

const login = () => {
  if (loginForm.value.username && loginForm.value.password) {
    MakeResponse.makeServerResponse(SignInService.login(loginForm.value), true, result => {
      if (result.result) {
        localStorage.setItem('logged-user', JSON.stringify(result.result));
        ToastNotificationService.success('ورود با موفقیت انجام شد');
        setTimeout(() => {
          navigateTo("/dashboard");
        }, 200);
      }
    });
  } else {
    ToastNotificationService.error('وارد کردن نام کاربری و رمز عبور اجباری است');
  }
}
</script>
