<template>
  <div class="">
    <div>
      <slot name="filterBox"></slot>
    </div>

    <DataTable
        v-model:selection="selectedItems"
        @update:selection="selectedCheckBox($event)"
        :size="size"
        showGridlines
        :value="listData"
        :scrollable="true"
        :row-hover="true"
        :striped-rows="true"
        tableStyle="min-width: 50rem"
    >

      <template #header v-if="hasHeader">
        <slot name="header"/>
      </template>

      <ColumnGroup type="header">
        <Row>
          <Column header="ردیف" :rowspan="2"/>

          <Column  :rowspan="2" v-if="hasCheckBox" selectionMode="multiple"></Column>

          <Column
              v-for="(col, index) of columns"
              :key="index"
              :field="col.field1"
              :header="col.header1"
              :rowspan="1"/>

          <Column header="عملیات" :rowspan="2" v-if="hasAction"/>
        </Row>

        <Row v-if="hasAction">
          <Column
              v-for="(col, index) of columns"
              :key="index"
              :header="col.header2"
              :rowspan="2"/>
        </Row>
      </ColumnGroup>


      <Column>
        <template #body="slotProps">
          {{ (take * (pageNumber - 1)) + slotProps.index + 1 }}
        </template>
      </Column>

      <Column :rowspan="2" v-if="hasCheckBox" selectionMode="multiple"></Column>

      <Column
          v-for="(col, index) of columns"
          :key="index">
        <template #body="slotProps">
          <p :class="col.format1 === 'action' ? 'cursor-pointer text-blue-2' : ''"
             @click="emitData(slotProps.data, col)" class="mb-0">
            <i v-if="col.format1 === 'action'" class="ms-1" :class="col.icon"></i>
            {{
              (col.isCurrency1 && slotProps.data[col.field1]) ? slotProps.data[col.field1].toLocaleString()
                  : slotProps.data[col.field1] || '---'
            }}
          </p>

          <!--          <hr />-->

          <p :class="col.format2 === 'action' ? 'cursor-pointer text-blue-2' : ''"
             @click="emitData(slotProps.data, col)" class="mb-0">
            <i v-if="col.format2 === 'action'" class="ms-1" :class="col.icon"></i>
            {{
              (col.isCurrency2 && slotProps.data[col.field2]) ? slotProps.data[col.field2].toLocaleString()
                  : slotProps.data[col.field2] || '---'
            }}
          </p>
        </template>
      </Column>
      <Column v-if="hasAction"
              header="عملیات" :rowspan="2">
        <template #body="slotProps">
          <div class="me-2 d-flex align-items-center justify-content-center">
            <template v-for="act of getColumnActions(slotProps.data.columnActions)">
              <div>
                <span class="cursor-pointer me-2" @click="colAction(act, slotProps.data)">
                  <i :class="[act.piIcon, act.style]" v-tooltip="act.title"></i>
                </span>
              </div>
            </template>
          </div>
        </template>
      </Column>

    </DataTable>

    <template v-if="hasPagination">
      <Paging :totalRows="totalRows" :take="take" @changePage="pagination($event)"/>
    </template>
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
  size: {
    type: String,
    default: 'normal'
  },
  hasHeader: {
    type: Boolean,
    default: false
  },
  hasCheckBox: {
    type: Boolean,
    default: false
  },
});
const selectedItems = ref();
const selectAll = ref(false);

const emit = defineEmits(['action', 'changePage', 'checked']);

const emitData = (data: any, col: any) => {
  const body = {
    col: col,
    data: data
  }
  if (col && (col.format1 || col.format2) === 'action')
    emit('action', body);
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

const selectedCheckBox = (event: any) => {
  emit('checked', event)
}
</script>

<style scoped>

</style>