<script setup lang="ts">
import { getBookByID } from '@/apis/book'
import { lend } from '@/apis/lend'
import { useMessage } from '@/utils'
import dayjs from 'dayjs'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const now: dayjs.Dayjs = dayjs()
const $message = useMessage()
const router = useRouter()

const form = reactive({
  cardID: '',
  bookID: '',
  duration: 1
})
const deadline = ref(dayjs().add(1, 'month').format('YYYY年MM月DD日'))
const book = reactive({
  name: '-',
  author: '-',
  isbn: '-'
})

watch(() => form.duration, (newVal) => {
  deadline.value = now.add(newVal, 'month').format('YYYY年MM月DD日')
})

function handleBookIDChange(value: string) {
  if (/^B\d{7}$/.test(value)) {
    getBookByID(value)
      .then(({data: res}) => {
        const { name, author, isbn } = res.data
        book.name = name
        book.author = author
        book.isbn = isbn
      })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors} : {values: any, errors: unknown}) {
  if (errors) {
    return
  }

  const { cardID, bookID, duration } = values
  console.log('cardID, bookID, duration: ', cardID, bookID, duration)

  lend({ cardID, bookID, duration })
    .then(() => {
      $message.success('借出成功')
      router.push('/books/lend/record')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">借出登记</span>
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
            field="cardID"
            label="读者证号"
            :rules="[
              {
                required: true,
                message: '读者证号为必填'
              },
              {
                match: /^C\d{7}$/,
                message: '请检查读者证号是否合法'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.cardID"
              placeholder="请输入读者证号"
            />
          </a-form-item>
          <a-form-item
            field="bookID"
            label="图书编号"
            :rules="[
              {
                required: true,
                message: '图书编号为必填'
              },
              {
                match: /^B\d{7}$/,
                message: '请检查图书编号是否合法'
              }
            ]"
            validate-trigger="input"
          >
            <a-input
              v-model="form.bookID"
              placeholder="请输入图书编号"
              @change="handleBookIDChange"
            />
          </a-form-item>
          <a-form-item
            field="bookName"
            label="图书名称"
          >
            <span> {{ book.name }} </span>
          </a-form-item>
          <a-form-item
            field="bookAuthor"
            label="图书作者"
          >
            <span> {{ book.author }} </span>
          </a-form-item>
          <a-form-item
            field="bookISBN"
            label="图书ISBN号"
          >
            <span> {{ book.isbn }} </span>
          </a-form-item>
          <a-form-item
            field="duration"
            label="借阅时长"
            :rules="[{
              required: true,
              message: '借阅时长为必填'
            }]"
          >
            <a-select v-model="form.duration">
              <a-option :value="1">
                1个月
              </a-option>
              <a-option :value="2">
                2个月
              </a-option>
              <a-option :value="3">
                3个月
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item
            field="deadline"
            label="到期时间"
          >
            <span>{{ deadline }}</span>
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
