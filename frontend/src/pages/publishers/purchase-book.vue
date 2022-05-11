<script setup lang="ts">
import { getBookByID, getBooksByPublisher, purchase } from '@/apis/book'
import { getPublisherByID } from '@/apis/publishers'
import { useMessage } from '@/utils'
import { BookListItem } from '@/utils/types'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const $message = useMessage()
const router = useRouter()

const form = reactive({
  publisherID: '',
  bookID: '',
  quantity: 0
})
const publisher = reactive({
  name: '-'
})
const booksList: Partial<BookListItem>[] = reactive([])
const visible = ref(false)
const currentRecord: Partial<BookListItem> = reactive({
  price: 0
})
const totalPrice = computed(() => ((currentRecord.price ?? 0) * (form.quantity ?? 0)).toFixed(2))

function handlePublisherIDChange(e: Event) {
  const publisherID: string = (e.target as HTMLInputElement).value
  if (/^P\d{4}$/.test(publisherID)) {
    getPublisherByID(publisherID)
      .then(({data: res}) => {
        publisher.name = res.data.name
      })

    getBooksByPublisher(publisherID)
      .then(({data: res}) => {
        booksList.length = 0
        booksList.push(...res.data)
      })
  }
}

function handleModalOK(done: (closed: boolean) => void) {
  if (form.bookID === '') {
    $message.warning('请选择欲订图书')
    done(false)
    return
  }
  
  getBookByID(form.bookID)
    .then(({data: res}) => {
      Object.assign(currentRecord, {
        ...res.data,
        record: `${res.data.name} / ${res.data.author}`
      })
    })

  done(true)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  purchase(values)
    .then(() => {
      $message.success('订购成功')
      router.push('/publishers')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">订购图书</span>
      <a-form
        class="form"
        :label-col-props="{ span: 7 }"
        :wrapper-col-props="{ span: 17 }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-space
          direction="vertical"
          :size="12"
        >
          <a-form-item
            field="publisherID"
            label="出版商编号"
            :rules="[
              {
                required: true,
                message: '出版商编号为必填'
              },
              {
                match: /^P\d{4}$/,
                message: '请检查出版商编号是否合法'
              }
            ]"
            validate-trigger="input"
            @change="handlePublisherIDChange"
          >
            <a-input
              v-model="form.publisherID"
              placeholder="请输入出版商编号"
            />
          </a-form-item>
          <a-form-item
            field="publisherName"
            label="出版商名称"
          >
            <span> {{ publisher.name }} </span>
          </a-form-item>
          <a-form-item
            field="bookID"
            label="欲订图书"
            :rules="[
              {
                required: true,
                message: '欲订图书为必填'
              }
            ]"
          >
            <span
              v-if="form.bookID !== ''"
              style="margin-right: 1rem;"
            >{{ currentRecord.record }}</span>
            <a-button
              type="primary"
              :disabled="!(booksList.length as unknown as boolean)"
              @click="() => visible = true"
            >
              {{ form.bookID === '' ? '选择记录' : '修改记录' }}
            </a-button>
          </a-form-item>
          <a-form-item
            field="bookName"
            label="图书名称"
          >
            <span> {{ currentRecord.name }} </span>
          </a-form-item>
          <a-form-item
            field="bookAuthor"
            label="图书作者"
          >
            <span> {{ currentRecord.author }} </span>
          </a-form-item>
          <a-form-item
            field="bookISBN"
            label="图书ISBN号"
          >
            <span> {{ currentRecord.isbn }} </span>
          </a-form-item>
          <a-form-item
            field="bookPrice"
            label="图书单价"
          >
            <span> {{ currentRecord.price }} </span>
          </a-form-item>
          <a-form-item
            field="quantity"
            label="订购数量"
            :rules="[
              {
                required: true,
                message: '订购数量为必填'
              }
            ]"
          >
            <a-input-number
              v-model="form.quantity"
              placeholder="请输入订购数量"
              :min="0"
              hide-button
            >
              <template #append>
                本
              </template>
            </a-input-number>
          </a-form-item>
          <a-form-item
            field="totalPrice"
            label="图书总价"
          >
            <h3> ￥{{ totalPrice }}元 </h3>
          </a-form-item>
          <div class="submit-box">
            <a-button
              html-type="submit"
              type="primary"
            >
              提交
            </a-button>
          </div>
        </a-space>
      </a-form>
    </div>
  </div>
  <a-modal
    v-model:visible="visible"
    title="选择欲订图书"
    @before-ok="handleModalOK"
  >
    <a-select
      v-model="form.bookID"
      placeholder="请选择欲订图书"
      allow-search
    >
      <a-option
        v-for="{id, record} in booksList"
        :key="id"
        :value="id"
      >
        {{ record }}
      </a-option>
    </a-select>
  </a-modal>
</template>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-box {
      @extend .component;

      width: 45rem;
      padding: 2rem {
        bottom: 3rem;
      };
      display: flex;
      align-items: center;
      flex-direction: column;
      
      .title {
        font-size: 1.3rem;
        margin-bottom: .8rem;
      }

      .form {
        width: 25rem;
        margin-top: .8rem;

        .submit-box {
          display: flex;
          justify-content: center;

          button {
            width: 30%;
            height: 2.3rem;
            font-size: 1rem;
            margin-top: .8rem;
          }
        }
      }
    }
  }
</style>
