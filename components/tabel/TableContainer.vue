<template>
  <div class="">
    <div>
      <slot name="filterBox"></slot>
    </div>

    <div class="p-2">
      <DataTable
          :size="size"
          v-model:selection="selectedItems"
          @update:selection="selectedCheckBox($event)"
          showGridlines
          :value="listData"
          :row-hover="true"
          :striped-rows="true"
          tableStyle="min-width: 50rem"

      >

        <template class="bg-white" #header v-if="hasHeader">
          <slot name="header"/>
        </template>

        <Column headerStyle="width: 1rem" header="ردیف">
          <template #body="slotProps">
            {{ (take * (pageNumber - 1)) + slotProps.index + 1 }}
          </template>
        </Column>

        <Column v-if="hasCheckBox" selectionMode="multiple" headerStyle="width: 3rem"></Column>

        <Column
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header">
          <template #body="slotProps">
            <span :class="col.format === 'action' ? 'cursor-pointer text-blue-2' : ''" @click="emitData(slotProps.data, col)">
              <i v-if="col.format === 'action'" class="ms-1" :class="col.icon"></i>
              <template v-if="slotProps.data[col.field]">
                {{
                  (col.isCurrency && slotProps.data[col.field]) ? slotProps.data[col.field].toLocaleString()
                      : slotProps.data[col.field] || '---'
                }}
              </template>
            </span>
            <span class="me-1" v-if="col.extraField">{{ col.extraField }}</span>
          </template>
        </Column>

        <template v-if="hasAction">
          <Column :header="actionName ? actionName : 'عملیات' " class="d-flex align-items-center justify-content-center">
            <template #body="slotProps">
              <div v-for="act of getColumnActions(slotProps.data.columnActions)" class="me-2">
                <span class="cursor-pointer me-2" @click="colAction(act, slotProps.data)">
                  <i :class="[act.piIcon, act.style]" v-tooltip="act.title"></i>
                </span>
              </div>
            </template>
          </Column>
        </template>

      </DataTable>

      <template v-if="hasPagination">
        <Paging :totalRows="totalRows" :take="take" @changePage="pagination($event)"/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Paging from "../paging/Pageing.vue";

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  listData: {
    type: Array,
    default: []
  },
  hasAction: {
    type: Boolean,
    default: true
  },
  hasPagination: {
    type: Boolean,
    default: true
  },
  totalRows: {
    type: Number,
    default: 0
  },
  pageNumber: {
    type: Number,
    default: 1
  },
  take: {
    type: Number,
    default: 10
  },
  hasHeader: {
    type: Boolean,
    default: false
  },
  hasCheckBox: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'normal'
  },
  actionName:{
    type: String,
    default: 'عملیات'
  }
});
const emit = defineEmits(['action', 'changePage', 'checked']);

const selectedItems = ref();

const emitData = (data: any, col: any) => {
  const body = {
    col: col,
    data: data
  }
  if (col && col.format === 'action')
    emit('action', body);
}

const selectedCheckBox = (event: any) => {
  emit('checked', event)
}

const colAction = (act: any, data: any) => {
  act.onClick(data);
}

const getColumnActions = (actions: any) => {
  if (actions)
    return actions.filter((p: any) => p.visibility == undefined || p.visibility == true);
}

const pagination = (paging: any) => {
  emit('changePage', paging);
}
</script>

<style lang="scss">
.p-datatable .p-column-header-content {
  justify-content: center;
}

.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
}

</style>