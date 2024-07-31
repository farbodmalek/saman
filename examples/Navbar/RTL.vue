<template>
  <nav id="navbarBlur"
       :class="navStore.navFixed ? `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl
       shadow-none position-sticky left-auto top-2 z-index-sticky ${navStore.darkMode ? 'bg-default' : 'bg-white'}`
       : `navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none`"
       v-bind="$attrs"
       data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <div class="sidenav-toggler sidenav-toggler-inner d-xl-block me-3">
        <a href="#" class="p-0 nav-link text-body" @click.prevent="toggleSidenav">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line" :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark'
                  : 'bg-white'">
            </i>
            <i class="sidenav-toggler-line" :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark'
                  : 'bg-white'">
            </i>
            <i class="sidenav-toggler-line" :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark'
                  : 'bg-white'">
            </i>
          </div>
        </a>
      </div>

      <div class="d-flex justify-content-between w-100">
<!--        <Breadcrumbs isRTL/>-->
        <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 px-0">
          <div class="pe-md-3 d-flex align-items-center me-md-auto">
            <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
              <input type="text" class="form-control" placeholder="جستجو..."/>
            </div>
          </div>
          <ul class="navbar-nav justify-content-end">

            <li class="nav-item d-flex align-items-center">
              <NuxtLink
                  to="/authentication/signin/basic"
                  class="px-0 nav-link font-weight-bold"
                  :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 text-dark' : 'text-white'"
                  target="_blank">
                <i class="fa fa-user ms-sm-2"></i>
                <span class="d-sm-inline d-none" v-if="userInfo">{{userInfo.fullName}}</span>
              </NuxtLink>
            </li>

            <li class="px-3 nav-item d-flex align-items-center">
              <a class="p-0 nav-link" @click="showMenu = !showMenu">
                <i :class="`cursor-pointer fa fa-cog fixed-plugin-button-nav ${!navStore.navFixed || navStore.darkMode
                    ? 'text-white' : 'opacity-8 text-dark'}`">
                </i>
              </a>
            </li>

            <li class="nav-item dropdown d-flex align-items-center ps-2">
              <a id="dropdownMenuButton"
                 href="#"
                 :class="`p-0 nav-link ${navStore.navFixed && !navStore.darkMode ? ' opacity-8 text-dark' : 'text-white'}
                 ${showMenu ? 'show' : ''}`"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
                 @click="showMenu = !showMenu">
                <i class="cursor-pointer fa fa-bell"></i>
              </a>
              <ul class="px-2 py-3 dropdown-menu dropdown-menu-start me-sm-n4"
                  :class="showMenu ? 'show' : ''"
                  aria-labelledby="dropdownMenuButton">
                <li class="d-flex justify-content-between" @click="logout()">
                  <span>خروج</span>
                  <span><i class="fa fa-sign-out-alt"></i> </span>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import {useNavStore} from "~~/store/NavStore";
import {BasePage} from "~/core/base/base-page";
import {SignInService} from "~/services/signIn-service";
import Breadcrumbs from "../Breadcrumbs";

const navStore = useNavStore();
const userInfo = ref();
const showMenu = ref(false);

function toggleSidenav() {
  navStore.toggleSidenavCollapsing();
}

function toggleShowConfig() {
  navStore.toggleShowConfig();
}

const getLoggedUser = () => {
  userInfo.value = BasePage.getLoggedUser();
}

const logout = () => {
  SignInService.logout();
}

onMounted(() => {
  getLoggedUser();
})
</script>
