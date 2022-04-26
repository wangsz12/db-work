<script setup lang="ts">
import { withAlignCenter } from "@/utils"
import { TableColumnData, TableData } from "@arco-design/web-vue"
import {
  IconBook,
  IconExport,
  IconTags
} from "@arco-design/web-vue/es/icon"
import { reactive } from "vue"

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

const data: TableData[] = reactive(Array(10).fill('').map((_, index) => ({
  key: String(index),
  id: 'b000001',
  name: '图解HTTP',
  author: '[日]上野 宣',
  quantity: 10,
  category: '计算机/网络',
  publisher: '人民邮电出版社',
  isbn: '9798115351531'
})))

function onTablePageChange(page: number) {
  console.log(page)
}
</script>

<template>
  <div class="container">
    <div class="data-box">
      <DataBox
        title="图书总数量"
        :value="1564"
      >
        <icon-book :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="外借数量"
        :value="745"
      >
        <icon-export :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="图书分类数量"
        :value="5"
      >
        <icon-tags :style="{fontSize: '22px'}" />
      </DataBox>
    </div>
    <div class="content-box">
      <span class="content-title">图书信息</span>
      <a-table
        class="table"
        :columns="columns"
        :data="data"
        page-position="bottom"
        @page-change="onTablePageChange"
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
