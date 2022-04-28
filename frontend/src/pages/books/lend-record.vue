<script setup lang="ts">
import { getLendRecordsByPage } from '@/apis/lend'
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
    width: 300
  },
  {
    title: '读者证号',
    dataIndex: 'cardID',
    width: 130
  },
  {
    title: '时间',
    dataIndex: 'date',
    width: 150
  },
  {
    title: '借阅时长',
    dataIndex: 'duration',
    slotName: 'duration',
    width: 200
  }
])
const tableData: TableData[] = reactive([])

getLendRecordsByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.records)
  })

const total = ref(0)

function handleTablePageChange(page: number) {
  getLendRecordsByPage(page)
    .then(({data: res}) => {
      tableData.splice(0, 10)
      tableData.push(...res.data.records)
    })
}
</script>

<template>
  <div class="container">
    <div class="content-box">
      <span class="content-title">借出信息</span>
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
        <template #duration="{ record }">
          <span> {{ record.duration }}个月 </span>
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
