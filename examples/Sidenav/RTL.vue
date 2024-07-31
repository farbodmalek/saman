<template>
  <aside
      id="sidenav-main"
      class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-4 fixed-end me-3 rotate-caret"
      :class="`${navStore.sidenavType}`">

    <div class="sidenav-header">
      <i id="iconSidenav"
         class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
         aria-hidden="true">
      </i>

      <div class="d-flex position-relative h-100">
        <div class="navbar-brand w-100">
          <img src="/img/drawer/men.svg" class="navbar-brand-img mb-2 w-100 h-100" alt="main_logo"/>
        </div>

        <div class="position-absolute timesIcon">
          <span class="ms-2 cursor-pointer"><i @click="toggleSidenav" class="fa fa-times"></i> </span>
        </div>
      </div>

    </div>

    <hr class="mt-0 horizontal dark"/>
    <SidenavList isRTL/>
  </aside>
</template>
<script setup>
import SidenavList from "./SidenavList.vue";
import {useNavStore} from "~~/store/NavStore";

const navStore = useNavStore();

function toggleSidenav() {
  navStore.toggleSidenavCollapsing();
}
</script>

<style scoped lang="scss">
.timesIcon {
  left: 1rem;
  top: 30%;
}
</style>
