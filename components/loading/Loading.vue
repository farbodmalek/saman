<template>
  <div class="loading-parent" v-if="loading">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">

import {loadingStore} from "~/store/loading-store";

const loadingMethod = loadingStore();
const loading = computed(() => loadingMethod.showLoading());

</script>

<style scoped lang="scss">

.loading-parent {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1108;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
}

.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}

.loader {
  color: #fff;
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.3s infinite linear;
  transform: translateZ(0);
}

@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em,
    2em -2em 0 0em, 3em 0 0 -1em,
    2em 2em 0 -1em, 0 3em 0 -1em,
    -2em 2em 0 -1em, -3em 0 0 -1em,
    -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em,
    3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em,
    -2em 2em 0 -1em, -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em,
    2em -2em 0 0, 3em 0 0 0.2em,
    2em 2em 0 0, 0 3em 0 -1em,
    -2em 2em 0 -1em, -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
    3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em,
    -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
    3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em,
    -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em,
    3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0,
    -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em,
    3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em,
    -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em,
    3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em,
    -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

</style>