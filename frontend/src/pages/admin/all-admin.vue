<script setup lang="ts">
import { deleteAdminByID, getAdminByPage, getAdminDataBox } from '@/apis/admin'
import { useMessage, withAlignCenter } from '@/utils'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { IconUserGroup } from '@arco-design/web-vue/es/icon'

const $message = useMessage()

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '工号',
    dataIndex: 'id',
    width: 150
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 100
  }
])

const dataBox = reactive({
  total: -1
})
const total = ref(0)
const tableData: TableData[] = reactive([])

getAdminDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

getAdminByPage()
    .then(({data: res}) => {
      total.value = res.data.total
      tableData.push(...res.data.admin)
    })

function handleTablePageChange(page: number) {
  getAdminByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.admin)
    })
}

function deleteAdmin(id: string) {
  deleteAdminByID(id)
    .then(() => {
      $message.success('删除成功')
      getAdminByPage()
        .then(({data: res}) => {
          total.value = res.data.total
          tableData.length = 0
          tableData.push(...res.data.admin)
        })
    })
}
</script>

<template>
  <div
    class="data-box"
    style="width: 80%"
  >
    <DataBox
      title="管理员总数量"
      :value="dataBox.total"
    >
      <icon-user-group :style="{fontSize: '22px'}" />
    </DataBox>
  </div>
  <div class="container">
    <div class="content-box">
      <span class="content-title">管理员信息</span>
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
        <template #operation="{ record }">
          <a-popconfirm
            content="确定要删除吗？"
            @ok="deleteAdmin(record.id)"
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
    box-sizing: border-box;
    padding: 0 10%;

    .content-box {
      @extend .component;
      padding: 1.5rem;
      margin-top: 1.5rem;
      
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
