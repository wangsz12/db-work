<script setup lang="ts">
import { reactive, ref } from "vue"
import {
  IconComputer,
  IconCheckCircle,
  IconCloseCircle
} from "@arco-design/web-vue/es/icon"
import { TableColumnData, TableData } from "@arco-design/web-vue"
import { withAlignCenter } from "@/utils"
import { getFines, getFinesDataBox } from "@/apis/fines"

const dataBox = reactive({
  total: 76,
  paid: 50,
  unpaid: 26
})
const total = ref(0)

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '罚款记录号',
    dataIndex: 'id',
    width: 130
  },
  {
    title: '读者证号',
    dataIndex: 'cardID',
    width: 140
  },
  {
    title: '所借图书编号',
    dataIndex: 'book.id',
    width: 140
  },
  {
    title: '所借图书名称',
    dataIndex: 'book.name',
  },
  {
    title: '所借图书作者',
    dataIndex: 'book.author',
  },
  {
    title: '罚款金额',
    dataIndex: 'amount',
    slotName: 'amount',
    width: 140
  },
  {
    title: '是否缴纳',
    dataIndex: 'paid',
    slotName: 'paid',
    width: 120
  }
])
const tableData: TableData[] = reactive([])

getFinesDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

getFines()
  .then(({data: res}) => {
    total.value = res.data.total

    tableData.length = 0
    tableData.push(...res.data.fines)
  })

function handleTablePageChange(page: number) {
  getFines(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.fines)
    })
}
</script>

<template>
  <div class="container">
    <div
      class="data-box"
      style="width: 80%"
    >
      <DataBox
        title="罚款记录总数"
        :value="dataBox.total"
      >
        <icon-computer :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="未缴纳罚款数"
        :value="dataBox.paid"
      >
        <icon-close-circle :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="已缴纳罚款数"
        :value="dataBox.unpaid"
      >
        <icon-check-circle :style="{fontSize: '22px'}" />
      </DataBox>
    </div>
    <div class="content-box">
      <span class="content-title">罚款记录</span>
      <a-table
        class="table"
        :columns="columns"
        :data="tableData"
        :pagination="{
          total,
          showTotal: true,
          showJumper: true
        }"
        page-position="bottom"
        @page-change="handleTablePageChange"
      >
        <template #amount="{ record }">
          <span> {{ record.amount }}元 </span>
        </template>
        <template #paid="{ record }">
          <span :style="`${record.paid ? '' : 'color: #fc243a'}`">
            {{ record.paid ? '是' : '否' }}
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    display: block;

    .content-box {
      @extend .component;
      margin-top: 1.5rem;
      padding: 1.5rem;
      
      .content-title {
        font-size: 1.3rem;
        margin-left: .5rem;
      }

      .table {
        margin-top: 1rem;
      }
    }
  }
</style>
