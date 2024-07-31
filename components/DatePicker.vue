<template>
  <DatePicker
      editable
      auto-submit
      v-model="date"
      class=""
      color="#00acc1"
      display-format="jYYYY/jMM/jDD"
      format="jYYYY/jMM/jDD"/>
</template>

<script setup lang="ts">
import DatePicker from 'vue3-persian-datetime-picker';

const date = ref('');
</script>

<style scoped>

</style>