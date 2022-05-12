<script setup lang="ts">
import { createPublisher } from '@/apis/publishers'
import { useMessage } from '@/utils'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const $message = useMessage()
const router = useRouter()

const form = reactive({
  name: '',
  contact: '',
  address: ''
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  createPublisher(values)
    .then(() => {
      $message.success('新增出版社成功')
      router.push('/publishers')
    })
    .catch(() => {
      $message.error('网络错误')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">新增出版社 </span>
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
                message: '出版社名称为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.name"
              placeholder="请输入出版社名称"
            />
          </a-form-item>
          <a-form-item
            field="contact"
            label="联系方式"
            :rules="[
              {
                required: true,
                message: '联系方式为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.contact"
              placeholder="请输入联系方式"
            />
          </a-form-item>
          <a-form-item
            field="address"
            label="地址"
            :rules="[
              {
                required: true,
                message: '地址为必填'
              }
            ]"
          >
            <a-input
              v-model="form.address"
              placeholder="请输入地址"
            />
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
