<script setup lang="ts">
import { createCategory, getAllParentCategories } from '@/apis/category'
import { useMessage } from '@/utils'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ParentCategory } from '@/utils/types'

const $message = useMessage()
const router = useRouter()

const form = reactive({
  name: '',
  parent: ''
})
const parents: ParentCategory[] = reactive([])

getAllParentCategories()
  .then(({data: res}) => {
    parents.push(...res.data)
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  createCategory(values)
    .then(() => {
      $message.success('新增分类成功')
      router.push('/categories')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">新增分类</span>
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
          >
            <a-input
              v-model="form.name"
              placeholder="请输入名称"
            />
          </a-form-item>
          <a-form-item
            field="parent"
            label="父分类"
            :rules="[
              {
                required: true,
                message: '父分类为必选'
              }
            ]"
          >
            <a-select
              v-model="form.parent"
              placeholder="请选择父分类"
            >
              <a-option
                v-for="item in parents"
                :key="item.id"
              >
                {{ item.name }}
              </a-option>
            </a-select>
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
