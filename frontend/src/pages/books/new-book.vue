<script setup lang="ts">
import { createBook } from '@/apis/book'
import { getPublisherByID } from '@/apis/publishers'
import { useMessage } from '@/utils'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const $message = useMessage()
const router = useRouter()

const form = reactive({
  name: '',
  author: '',
  category: '',
  isbn: '',
  publisherID: '',
  price: 0,
})
const publisher = reactive({
  name: '-'
})

function handlePublisherIDChange(e: Event) {
  const publisherID: string = (e.target as HTMLInputElement).value
  if (/^P\d{4}$/.test(publisherID)) {
    getPublisherByID(publisherID)
      .then(({data: res}) => {
        publisher.name = res.data.name
      })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }
  console.log('values: ', values)

  createBook(values)
    .then(() => {
      $message.success('信息录入成功')
      router.push('/books')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">录入图书信息</span>
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
            field="name"
            label="名称"
            :rules="[
              {
                required: true,
                message: '名称为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.name"
              placeholder="请输入图书名称"
            />
          </a-form-item>
          <a-form-item
            field="author"
            label="作者"
            :rules="[
              {
                required: true,
                message: '作者为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.author"
              placeholder="请输入图书作者"
            />
          </a-form-item>
          <a-form-item
            field="category"
            label="分类"
            :rules="[
              {
                required: true,
                message: '分类为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.category"
              placeholder="请输入图书分类"
            />
          </a-form-item>
          <a-form-item
            field="isbn"
            label="ISBN号"
            :rules="[
              {
                required: true,
                message: 'ISBN号为必填'
              },
              {
                match: /^\d{13}$/,
                message: '请检查图书ISBN编号是否合法'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.isbn"
              :max-length="13"
              placeholder="请输入图书ISBN号"
            />
          </a-form-item>
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
              :max-length="5"
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
            field="price"
            label="单价"
            :rules="[
              {
                required: true,
                message: '图书单价为必填'
              }
            ]"
          >
            <a-input-number
              v-model="form.price"
              placeholder="请输入图书单价"
              :min="0"
              :precision="2"
              hide-button
            >
              <template #prefix>
                ￥
              </template>
              <template #append>
                元
              </template>
            </a-input-number>
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
        width: 23rem;
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
