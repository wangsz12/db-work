<script setup lang="ts">
import { createCard } from '@/apis/card'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  gender: 0,
  contact: '',
  address: ''
})
const newID = ref('')
const visible = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  createCard(values)
    .then(({data: res}) => {
      newID.value = res.data.id
      visible.value = true
    })
}

function handleModalOK() {
  router.push('/cards')
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">新建读者证</span>
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
            validate-trigger="input"
          >
            <a-input
              v-model="form.name"
              placeholder="请输入姓名"
            />
          </a-form-item>
          <a-form-item
            field="gender"
            label="性别"
            :rules="[
              {
                required: true,
                message: '性别为必填'
              }
            ]"
            validate-trigger="input"
          >
            <a-select
              v-model="form.gender"
              placeholder="请选择性别"
            >
              <a-option :value="0">
                男
              </a-option>
              <a-option :value="1">
                女
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item
            field="contact"
            label="联系方式"
            :rules="[
              {
                required: true,
                message: '联系方式为必填'
              },
              {
                match: /^1\d{10}$/,
                message: '请检查联系方式是否合法'
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
  <a-modal
    v-model:visible="visible"
    title="创建成功"
    hide-cancel
    @ok="handleModalOK"
  >
    <span style="margin-right: .5rem;">创建成功，卡号为</span>
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
