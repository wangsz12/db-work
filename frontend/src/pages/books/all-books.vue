<script setup lang="ts">
import { getBookDataBox, getBooks } from "@/apis/books"
import { withAlignCenter } from "@/utils"
import { TableColumnData, TableData } from "@arco-design/web-vue"
import {
  IconBook,
  IconExport,
  IconTags
} from "@arco-design/web-vue/es/icon"
import { reactive, ref } from "vue"

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '编号',
    dataIndex: 'id',
    width: 150
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
    width: 100
  },
  {
    title: '类别',
    dataIndex: 'category',
    width: 150
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
])

const total = ref(0)
const tableData: TableData[] = reactive([])
const dataBox = reactive({
  books: -1,
  lend: -1,
  categories: -1
})
const loading = ref(true)

getBookDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })

getBooks()
  .then(({data: res}) => {
    total.value = res.data.total
    tableData.push(...res.data.books)
  })
  .finally(() => {
    loading.value = false
  })

function handleTablePageChange(page: number) {
  getBooks(page)
    .then(({data: res}) => {
      total.value = res.data.total
      tableData.splice(0, 10)
      tableData.push(...res.data.books)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="container">
    <div class="data-box">
      <DataBox
        title="图书总数量"
        :value="dataBox.books"
      >
        <icon-book :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="外借数量"
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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    display: block;

    .greeting-box {
      height: 1.8rem;
      min-width: 100%;
      margin-bottom: 1.7rem;
      overflow: hidden;

      span {
        display: inline-block;
      }

      span:nth-child(1) {
        font-size: 1.1rem;
        margin-left: 1rem;
        animation: greeting-show .8s ease;
      }

      span:nth-child(2) {
        font-size: 1.4rem;
        animation: greeting-show .8s ease .3s;
        animation-fill-mode: forwards;
        transform: translateY(2rem);
      }
    }

    .data-box {
      @extend .data-box;
      width: 100%;
    }

    .content-box {
      @extend .component;
      margin-top: 1.5rem;
      padding: 1.5rem;

      .search-box {
        height: 10rem;
        width: 100%;
        background-color: pink;
      }
      
      .content-title {
        font-size: 1.3rem;
        margin-left: .5rem;
      }

      .table {
        margin-top: 1rem;
      }
    }
  }

  @keyframes greeting-show {
    from {
      transform: translateY(1.8rem);
    }

    to {
      transform: translateY(0);
    }
  }
</style>
