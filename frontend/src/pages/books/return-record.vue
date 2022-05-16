<script setup lang="ts">
import { getReturnRecordByPage } from '@/apis/return'
import { withAlignCenter } from '@/utils'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '编号',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '书名',
    dataIndex: 'book.name',
  },
  {
    title: '作者',
    dataIndex: 'book.author',
  },
  {
    title: '读者证号',
    dataIndex: 'cardID',
    width: 130
  },
  {
    title: '归还时间',
    dataIndex: 'date',
    width: 150
  },
  {
    title: '是否逾期',
    dataIndex: 'isOverdue',
    slotName: 'isOverdue',
    width: 100
  },
  {
    title: '罚款金额',
    dataIndex: 'fine',
    slotName: 'fine',
    width: 150
  },
  {
    title: '是否已缴纳',
    dataIndex: 'paid',
    slotName: 'paid',
    width: 110
  }
])
const tableData: TableData[] = reactive([])

const total = ref(0)

getReturnRecordByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.records)
  })

function handleTablePageChange(page: number) {
  getReturnRecordByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.records)
    })
}
</script>

<template>
  <div class="container">
    <div class="content-box">
      <span class="content-title">归还信息</span>
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
        <template #isOverdue="{ record }">
          <span :style="`${record.isOverdue ? 'color: #fc243a' : ''}`"> {{ record.isOverdue ? '是' : '否' }} </span>
        </template>
        <template #fine="{ record }">
          <span> {{ record.fine > 0 ? `${record.fine}元` : '-' }} </span>
        </template>
        <template #paid="{ record }">
          <span :style="`${record.isOverdue && !record.paid ? 'color: #fc243a' : ''}`">
            {{
              record.isOverdue
                ? record.paid ? '是' : '否'
                : '-'
            }}
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
