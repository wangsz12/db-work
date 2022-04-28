<script setup lang="ts">
import { getLendRecordsByCardID, getLendRecordsByID } from '@/apis/lend'
import { returnBook } from '@/apis/return'
import { useMessage } from '@/utils'
import { LendRecord } from '@/utils/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const $message = useMessage()
const router = useRouter()

const form = reactive({
  cardID: '',
  lendID: ''
})
const lendRecords: Partial<LendRecord>[] = reactive([])
const visible = ref(false)
const currentRecord: Partial<LendRecord> = reactive({})

function handleCardIDChange(e: Event) {
  const cardID: string = (e.target as HTMLInputElement).value
  if (/^1\d{6}$/.test(cardID)) {
    getLendRecordsByCardID(cardID)
      .then(({data: res}) => {
        lendRecords.splice(0, lendRecords.length)
        lendRecords.push(...res.data)
      })
  }
}

function handleModalOK(done: (closed: boolean) => void) {
  if (form.lendID === '') {
    $message.warning('请选择借阅记录')
    done(false)
    return
  }
  
  getLendRecordsByID(form.lendID)
    .then(({data: res}) => {
      Object.assign(currentRecord, res.data)
    })

  done(true)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit({values, errors}: {values: any, errors: unknown}) {
  if (errors) {
    return
  }
  
  const { cardID, lendID } = values

  returnBook({ cardID, lendID })
    .then(() => {
      $message.success('归还成功')
      router.push('/books')
    })
    .catch(() => {
      $message.success('网络错误')
    })
}
</script>

<template>
  <div class="container">
    <div class="form-box">
      <span class="title">归还登记</span>
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
            label="借阅证号"
            :rules="[
              {
                required: true,
                message: '借阅证号为必填'
              },
              {
                match: /^1\d{6}$/,
                message: '请检查借阅证号是否合法'
              }
            ]"
            validate-trigger="input"
            @change="handleCardIDChange"
          >
            <a-input
              v-model="form.cardID"
              placeholder="请输入借阅证号"
            />
          </a-form-item>
          <a-form-item
            field="lendID"
            label="借阅记录"
            :rules="[
              {
                required: true,
                message: '借阅记录为必填'
              }
            ]"
          >
            <span
              v-if="form.lendID !== ''"
              style="margin-right: 1rem;"
            >{{ currentRecord.record }}</span>
            <a-button
              type="primary"
              :disabled="!(lendRecords.length as boolean)"
              @click="() => visible = true"
            >
              {{ form.lendID === '' ? '选择记录' : '修改记录' }}
            </a-button>
          </a-form-item>
          <a-form-item
            field="bookID"
            label="图书编号"
          >
            <span> {{ currentRecord.id ?? '-' }} </span>
          </a-form-item>
          <a-form-item
            field="bookName"
            label="图书名称"
          >
            <span> {{ currentRecord.book?.name ?? '-' }} </span>
          </a-form-item>
          <a-form-item
            field="bookAuthor"
            label="图书作者"
          >
            <span> {{ currentRecord.book?.author ?? '-' }} </span>
          </a-form-item>
          <a-form-item
            field="bookISBN"
            label="图书ISBN号"
          >
            <span> {{ currentRecord.book?.isbn ?? '-' }} </span>
          </a-form-item>
          <a-form-item
            field="lendDate"
            label="借阅日期"
          >
            <span> {{ currentRecord.date ?? '-' }} </span>
          </a-form-item>
          <a-form-item
            field="duration"
            label="借阅时长"
          >
            <span> {{ currentRecord.duration ? `${currentRecord.duration}个月` : '-' }} </span>
          </a-form-item>
          <a-form-item
            field="overdue"
            label="是否逾期"
          >
            <span>
              {{
                currentRecord.isOverdue === undefined
                  ? '-'
                  : currentRecord.isOverdue ? '是' : '否'
              }}
            </span>
          </a-form-item>
          <a-form-item
            field="fine"
            label="应缴罚款"
          >
            <span> {{ currentRecord.fine ? `${currentRecord.fine}元` : '-' }} </span>
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
    title="选择借阅记录"
    @before-ok="handleModalOK"
  >
    <a-select
      v-model="form.lendID"
      placeholder="请选择借阅记录"
      allow-search
    >
      <a-option
        v-for="{id, record} in lendRecords"
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
        max-width: 25rem;
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
