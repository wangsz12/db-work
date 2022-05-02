<script setup lang="ts">
import { useUserStore } from '@/store'
import dayjs from 'dayjs'
import {
  IconBook,
  IconUser,
  IconExport,
  IconComputer
} from '@arco-design/web-vue/es/icon'
import { reactive, ref } from 'vue'
import { TableColumnData, TableData } from '@arco-design/web-vue'
import { withAlignCenter } from '@/utils'
import { getRecentRecord } from '@/apis/book'
import { getIndexDataBox } from '@/apis/other'

let greeting = (() => {
  const hour = dayjs().hour()
  if (hour >= 6 && hour < 9) return '早上好'
  if (hour >= 9 && hour < 11) return '上午好'
  if (hour >= 11 && hour < 13) return '中午好'
  if (hour >= 13 && hour < 18) return '下午好'
  if (hour >= 18 || hour < 6) return '晚上好'
})()

const userInfo = useUserStore()

const columns: TableColumnData[] = withAlignCenter([
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
    width: 100
  },
  {
    title: '书名',
    dataIndex: 'name',
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 300
  },
  {
    title: '读者证号',
    dataIndex: 'cardID',
    width: 130
  },
  {
    title: '归还期限',
    dataIndex: 'deadline',
    width: 200
  },
  {
    title: '是否逾期',
    dataIndex: 'isOverdue',
    slotName: 'overdue',
    width: 100
  }
])

const tableData: TableData[] = reactive([])
const dataBox = reactive({
  books: -1,
  readers: -1,
  lend: -1,
  unpaidFine: -1
})
const loading = ref(true)

getRecentRecord()
  .then(({data: res}) => {
    tableData.push(...res.data as TableData[])
  })
  .finally(() => {
    loading.value = false
  })

getIndexDataBox()
  .then(({data: res}) => {
    Object.assign(dataBox, res.data)
  })
</script>

<template>
  <div class="container">
    <div class="greeting-box">
      <span>{{ greeting }}，</span>
      <span>{{ userInfo.name }}</span>
    </div>
    <div class="data-box">
      <DataBox
        title="图书总数"
        :value="dataBox.books"
        click-to="/books"
      >
        <icon-book :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="注册读者数"
        :value="dataBox.readers"
        click-to="/cards"
      >
        <icon-user :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="在借图书"
        :value="dataBox.lend"
        click-to="/books/lend/record"
      >
        <icon-export :style="{fontSize: '22px'}" />
      </DataBox>
      <DataBox
        title="欠缴罚款数"
        :value="dataBox.unpaidFine"
        click-to="/fines"
      >
        <icon-computer :style="{fontSize: '22px'}" />
      </DataBox>
    </div>
    <div class="content-box">
      <span class="content-title">最近借阅情况</span>
      <a-table
        class="table"
        :columns="columns"
        :data="tableData"
        :pagination="false"
        :loading="loading"
      >
        <template #status="{ record }">
          <span :style="`color: ${record.status === '归还' ? '#0de20d' : '#fc243a'}`">{{ record.status }}</span>
        </template>
        <template #overdue="{ record }">
          <span :style="record.isOverdue ? 'color: #fc243a' : ''">{{ record.isOverdue ? '是' : '否' }}</span>
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

    .greeting-box {
      height: 1.8rem;
      min-width: 100%;
      margin-bottom: 1.5rem;
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

