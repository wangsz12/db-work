<script setup lang="ts">
import { useMessage, withAlignCenter } from '@/utils'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { IconArchive, IconBranch } from "@arco-design/web-vue/es/icon"
import { deleteCategoryByID, getCategoriesByPage, getCategoryDataBox } from '@/apis/category'

const $message = useMessage()

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '父分类',
    dataIndex: 'parent',
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 100
  }
])
const tableData: TableData[] = reactive([])
const total = ref(0)

getCategoriesByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.categories)
  })

function handleTablePageChange(page: number) {
  getCategoriesByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.categories)
    })
}

const dataBox = reactive({
  total: -1,
  parents: -1
})

getCategoryDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

function deleteCategory(id: string) {
  deleteCategoryByID(id)
    .then(() => {
      $message.success('删除成功')
      getCategoriesByPage()
        .then(({data: res}) => {
          total.value = res.data.total
          tableData.length = 0
          tableData.push(...res.data.categories)
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
        title="分类总数"
        :value="dataBox.total"
      >
        <icon-archive :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="父分类数"
        :value="dataBox.parents"
      >
        <icon-branch :style="{fontSize: '22px'}" />
      </DataBox>
    </div>
    <div class="content-box">
      <span class="content-title">分类信息</span>
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
            @ok="deleteCategory(record.id)"
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