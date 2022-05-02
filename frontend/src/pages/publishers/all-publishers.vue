<script setup lang="ts">
import { getPublisherByPage, getPublisherDataBox } from '@/apis/publishers'
import { useMessage, withAlignCenter } from '@/utils'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { IconPrinter } from "@arco-design/web-vue/es/icon"

const $message = useMessage()

const dataBox = reactive({
  publishers: -1
})

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '编号',
    dataIndex: 'id',
    width: 250
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '联系方式',
    dataIndex: 'contact'
  },
  {
    title: '地址',
    dataIndex: 'address'
  }
])
const tableData: TableData[] = reactive([])
const total = ref(0)

getPublisherDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

getPublisherByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.publishers)
  })

function handleTablePageChange(page: number) {
  getPublisherByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.publishers)
    })
    .catch(() => {
      $message.error('网络错误')
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
        title="出版商总数量"
        :value="dataBox.publishers"
      >
        <icon-printer :style="{fontSize: '22px'}" />
      </DataBox>
    </div>
    <div class="content-box">
      <span class="content-title">图书信息</span>
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
      />
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

