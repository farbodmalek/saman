<template>
  <div class="row w-100 bg-white">
    <div class="col-12 font-0-9 bg-black-2 rounded-2 text-center p-2 text-white">{{title}}</div>
    <template v-for="(col, index) of dataTable" :key="index">
      <div class="col-6 border p-1">
        <p class="font-0-8"
           :class="[{'text-dark': !col.style && col.format !== 'action'}, col.style, {'text-primary': col.format === 'action'}]">
          {{col.label}}
        </p>
      </div>
      <div class="col-6 border p-1">
        <p class="font-0-9"
           :class="[{'text-dark': !col.style && col.format !== 'action'}, col.style, {'text-primary cursor-pointer': col.format === 'action'}]"
           @click="onEmitData(col)">
          {{col.value}}
          <span
              :class="[{'text-dark': !col.style && col.format !== 'action'}, col.style, {'text-primary cursor-pointer': col.format === 'action'}]"
              class="me-1" v-if="col.extraField">{{col.extraField}}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  dataTable: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    default: ''
  },
});
const emit = defineEmits(['dataEmit']);

const onEmitData = (value: any) => {
  if (value && value.format === 'action') {
    emit('dataEmit', value);
  }
}
</script>

<style scoped>

</style>