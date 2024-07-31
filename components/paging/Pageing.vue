<template>
  <div>
    <Paginator
        @page="$emit('changePage', $event)"
        :rows="take"
        :totalRecords="totalRows"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        :rowsPerPageOptions="[5, 10, 25, 50, 100]">
    </Paginator>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalRows: {
    type: Number,
    default: 0
  },
  take: {
    type: Number,
    default: 10
  },
})
</script>

<style scoped lang="scss">

</style>