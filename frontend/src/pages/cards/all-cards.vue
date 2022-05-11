<script setup lang="ts">
import { useMessage, withAlignCenter } from '@/utils'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { IconIdcard, IconMan, IconWoman } from "@arco-design/web-vue/es/icon"
import { deleteCardByID, getCardDataBox, getCardsByPage } from '@/apis/card'

const $message = useMessage()

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '读者证号',
    dataIndex: 'id',
    width: 200
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 150,
    slotName: 'gender'
  },
  {
    title: '联系方式',
    dataIndex: 'contact',
    width: 200
  },
  {
    title: '住址',
    dataIndex: 'address'
  },
  {
    title: '共借阅书籍数量',
    dataIndex: 'haveLent',
    width: 150
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 100
  }
])
const tableData: TableData[] = reactive([])
const total = ref(0)

getCardsByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.cards)
  })

function handleTablePageChange(page: number) {
  getCardsByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.cards)
    })
}

const dataBox = reactive({
  total: -1,
  male: -1,
  female: -1
})

getCardDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

function deleteCard(id: string) {
  deleteCardByID(id)
    .then(() => {
      $message.success('删除成功')
      getCardsByPage()
        .then(({data: res}) => {
          total.value = res.data.total
          tableData.length = 0
          tableData.push(...res.data.cards)
        })
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
        title="读者证总数"
        :value="dataBox.total"
      >
        <icon-idcard :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="男性读者数"
        :value="dataBox.male"
      >
        <icon-man :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="女性读者数"
        :value="dataBox.female"
      >
        <icon-woman :style="{fontSize: '22px'}" />
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
      >
        <template #gender="{ record }">
          <span> {{ record.gender ? '女' : '男' }} </span>
        </template>
        <template #operation="{ record }">
          <a-popconfirm
            content="确定要删除吗？"
            @ok="deleteCard(record.id)"
          >
            <a-button
              type="primary"
              size="mini"
              status="danger"
            >
              删除
            </a-button>
          </a-popconfirm>
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