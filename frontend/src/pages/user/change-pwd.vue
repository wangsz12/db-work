<script setup lang="ts">
import { changePwd } from '@/apis/admin'
import { useStore } from '@/store'
import { useMessage } from '@/utils'
import md5 from 'blueimp-md5'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const $message = useMessage()
const router = useRouter()
const store = useStore()

const form = reactive({
  prev: '',
  new: '',
  repeat: ''
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  if (values.prev === values.new) {
    $message.warning('新旧密码必须不一致')
    form.new = form.repeat = ''
    return
  }

  changePwd(store.id, md5(values.prev) ,md5(values.new))
    .then(() => {
      $message.success('修改密码成功')
      router.push('/')
    })
    .catch((err: Error) => {
      $message.error(err.message)
      form.prev = ''
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">更改密码</span>
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
            field="prev"
            label="旧密码"
            :rules="[
              {
                required: true,
                message: '旧密码为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-input-password
              v-model="form.prev"
              placeholder="请输入旧密码"
            />
          </a-form-item>
          <a-form-item
            field="new"
            label="新密码"
            :rules="[
              {
                required: true,
                message: '新密码为必填'
              },
              {
                minLength: 6,
                message: '密码长度至少为6'
              }
            ]"
            validate-trigger="input"
          >
            <a-input-password
              v-model="form.new"
              placeholder="请输入新密码"
            />
          </a-form-item>
          <a-form-item
            field="repeat"
            label="重复新密码"
            :rules="[
              {
                required: true,
                message: '请重复新密码'
              },
              {
                validator: (value, cb) => {
                  if (value !== form.new) {
                    cb('两次输入的密码不一致')
                  }
                }
              }
            ]"
          >
            <a-input-password
              v-model="form.repeat"
              placeholder="请重复新密码"
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
