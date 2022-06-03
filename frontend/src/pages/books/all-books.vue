<script setup lang="ts">
import { deleteBookByID, getBookDataBox, getBooksByPage } from "@/apis/book"
import { useMessage, withAlignCenter } from "@/utils"
import { TableColumnData, TableData } from "@arco-design/web-vue"
import {
  IconBook,
  IconExport,
  IconTags
} from "@arco-design/web-vue/es/icon"
import { reactive, ref } from "vue"

const $message = useMessage()

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '编号',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '作者',
    dataIndex: 'author'
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    width: 80
  },
  {
    title: '类别',
    dataIndex: 'category',
    width: 200
  },
  {
    title: '出版社',
    dataIndex: 'publisher',
    width: 180
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn',
    width: 150
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 100
  }
])

const total = ref(0)
const tableData: TableData[] = reactive([])
const dataBox = reactive({
  total: -1,
  lend: -1,
  categories: -1
})
const loading = ref(true)

getBookDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

getBooksByPage()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.books)
  })
  .finally(() => {
    loading.value = false
  })

function deleteBook(id: string) {
  deleteBookByID(id)
    .then(() => {
      $message.success('删除成功')
      getBooksByPage()
        .then(({data: res}) => {
          total.value = res.data.total
          tableData.length = 0
          tableData.push(...res.data.books)
        })
    })
}

function handleTablePageChange(page: number) {
  getBooksByPage(page)
    .then(({data: res}) => {
      tableData.length = 0
      tableData.push(...res.data.books)
    })
    .finally(() => {
      loading.value = false
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
        title="图书总数量"
        :value="dataBox.total"
      >
        <icon-book :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="在借数量"
        :value="dataBox.lend"
      >
        <icon-export :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="图书类别数量"
        :value="dataBox.categories"
      >
        <icon-tags :style="{fontSize: '22px'}" />
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
        <template #operation="{ record }">
          <a-popconfirm
            content="确定要删除吗？"
            @ok="deleteBook(record.id)"
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
