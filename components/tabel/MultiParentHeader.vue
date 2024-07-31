<template>
  <div>
    <div>
      <slot name="filterBox"></slot>
    </div>

    <div>
      <DataTable
          v-model:selection="selectedItems"
          @update:selection="selectedCheckBox($event)"
          showGridlines
          :value="listData"
          :row-hover="true"
          :scrollable="true"
          scrollHeight="650px"
          :striped-rows="true"
          class="oracle-sql-table"
          tableStyle="min-width: 50rem">
        <ColumnGroup type="header">

          <template>

            <Row>
              <Column header="ردیف" :rowspan="5"/>
            </Row>

            <Row>
              <Column  :rowspan="5" v-if="hasCheckBox" selectionMode="multiple"></Column>
            </Row>
            <Row>

              <template v-for="item in columns" :key="item">
                <Column :header="item.header" :rowspan="item.rowspan" :colspan="item.colspan"></Column>
              </template>
            </Row>
            <Row>
              <template v-for="item in columns" :key="item">
                <template v-if="item.child?.length > 0">
                  <Column v-for="col of item?.child" :key="col" :header="col.header" :rowspan="col.rowspan" :colspan="col.colspan" />
                </template>
              </template>
            </Row>
            <Row>
              <template v-for="item in columns" :key="item">
                <template v-if="item.child?.length > 0">
                  <template v-for="col in item.child" :key="col">
                    <template v-if="col.child?.length > 0">
                      <Column v-for="col2 of col.child" :key="col2" :header="col2.header" :rowspan="col2.rowspan" :colspan="col2.colspan" />
                    </template>
                  </template>
                </template>
              </template>
            </Row>
          </template>
        </ColumnGroup>
        <Column>
          <template #body="slotProps">
            {{ (take * (pageNumber - 1)) + slotProps.index + 1 }}
          </template>
        </Column>
        <Column :rowspan="3" v-if="hasCheckBox" selectionMode="multiple"></Column>
        <template v-for="(col, index) in columns" :key="index">
          <template v-if="col?.child && col.child?.length > 0">
            <template v-for="(childCol, index2) in col.child" :key="index2">
              <template v-if="childCol.child && childCol.child.length > 0">
                <Column v-for="(subCol, i) in childCol.child" :key="i">

                  <template v-if="subCol.hasInput" #body="slotProps">
                    <div v-if="[1].includes(childCol.id)">
                      <div class="form-group">
                        <input-number v-model="slotProps.data[childCol.field]" placeholder="شماره فیش"/>
                      </div>

                      <div class="form-group">
                        <input-number v-model="slotProps.data[subCol.field]" placeholder="دریافتی از مشتری"/>
                      </div>
                    </div>

                    <div v-if="[2].includes(childCol.id)">
                      <div class="form-group">
                        <input-number v-model="slotProps.data[childCol.field]" placeholder="تاریخ فیش"/>
                      </div>

                      <div class="form-group">
                        <input-number v-model="slotProps.data[subCol.field]" placeholder="توضیحات "/>
                      </div>

                    </div>

                  </template>

                  <template v-else #body="slotProps">
                    <p v-if="childCol.field" :class="subCol.format === 'action' ? 'cursor-pointer text-blue-2' : ''"
                       class="mb-0" @click="emitData(slotProps.data, subCol)">
                      <i v-if="subCol.format === 'action'" :class="subCol.icon" class="ms-1"></i>
                      {{
                        (childCol.isCurrency && slotProps.data[childCol.field]) ? slotProps.data[childCol.field].toLocaleString() : slotProps.data[childCol.field] || '---'
                      }}
                    </p>
                    <p :class="subCol.format === 'action' ? 'cursor-pointer text-blue-2' : ''" class="mb-0"
                       @click="emitData(slotProps.data, subCol)">
                      <i v-if="subCol.format === 'action'" :class="subCol.icon" class="ms-1"></i>
                      {{
                        (subCol.isCurrency && slotProps.data[subCol.field]) ? slotProps.data[subCol.field].toLocaleString() : slotProps.data[subCol.field] || '---'
                      }}
                    </p>

                    <p v-if="subCol.field2" :class="subCol.format === 'action' ? 'cursor-pointer text-blue-2' : ''"
                       class="mb-0" @click="emitData(slotProps.data, subCol)">
                      <i v-if="subCol.format === 'action'" :class="subCol.icon" class="ms-1"></i>
                      {{ (subCol.isCurrency && slotProps.data[subCol.field2]) ? slotProps.data[subCol.field2].toLocaleString() : slotProps.data[subCol.field2] || '---' }}
                    </p>
                  </template>
                </Column>
              </template>
              <Column v-else>

                <template #body="slotProps">
                  <p class="mb-0">
                    <span>{{ slotProps.data[childCol.field1] || '---' }}</span>
                    <br>
                    <span>{{ slotProps.data[childCol.field2] || '---' }}</span>
                  </p>
                </template>
              </Column>
            </template>
          </template>

          <Column v-else>
            <template #body="slotProps">
              <p class="mb-0">
                {{
                  slotProps.data[col.field] || '---'
                }}
              </p>
            </template>
          </Column>
        </template>

      </DataTable>
      <template v-if="hasPagination">
        <Paging :totalRows="totalRows" :take="take" @changePage="pagination($event)"/>
        <div class="form-group m-auto">
          <button class="btn btn-primary fw-normal " @click="Confirmation($event)"> ثبت و تائید موارد</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Paging from "~/components/paging/Pageing.vue";

const props = defineProps({
  columns:{
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
  actionName: {
    type: String,
    default: 'عملیات'
  }
});


const form = reactive({
  bankReceiptNumber:null,
  bankReceiptDateFa:null,
  amount:null,
  bankDescription:null,

})
const emit = defineEmits(['action', 'changePage', 'checked','Confirmation']);

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

const Confirmation = (paging: any) => {
  emit('Confirmation', paging);
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
