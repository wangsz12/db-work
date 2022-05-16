<script setup lang="ts">
import { createAdmin } from '@/apis/admin'
import md5 from 'blueimp-md5'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  account: '',
  password: ''
})
const newID = ref('')
const visible = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  values.password = md5(values.password)

  createAdmin(values)
    .then(({data: res}) => {
      newID.value = res.data.id
      visible.value = true
    })
}

function handleModalOK() {
  router.push('/admin')
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">新增管理员</span>
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
            label="姓名"
            :rules="[
              {
                required: true,
                message: '姓名为必填'
              }
            ]"
          >
            <a-input
              v-model="form.name"
              placeholder="请输入姓名"
            />
          </a-form-item>
          <a-form-item
            field="account"
            label="账号"
            :rules="[
              {
                required: true,
                message: '账号为必填'
              }
            ]"
          >
            <a-input
              v-model="form.account"
              placeholder="请输入账号"
            />
          </a-form-item>
          <a-form-item
            field="password"
            label="密码"
            :rules="[
              {
                required: true,
                message: '密码为必填'
              },
              {
                minLength: 6,
                message: '密码长度至少为6'
              }
            ]"
          >
            <a-input
              v-model="form.password"
              placeholder="请输入密码"
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
  <a-modal
    v-model:visible="visible"
    title="创建成功"
    hide-cancel
    @ok="handleModalOK"
  >
    <span style="margin-right: .5rem;">创建成功，管理员工号为</span>
    <strong> {{ newID }} </strong>
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
