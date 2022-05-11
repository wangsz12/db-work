import Axios from "@/config/axios"
import { useStore } from "@/store"
import { ReturnRequest } from "@/utils/types"

export function getReturnRecordByPage(page = 1) {
  return Axios.get('/records/return', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 235,
  //   records: Array(10).fill('').map((_, index) => ({
  //     id: `R${('0000000' + (10 * page + index + 1)).slice(-7)}`,
  //     book: {
  //       id: 'B000001',
  //       name: '图解HTTP',
  //       author: '[日]上野 宣'
  //     },
  //     cardID: '1000001',
  //     date: '2022-04-28',
  //     isOverdue: Math.random() > 0.5,
  //     fine: 3.26,
  //     paid: Math.random() > 0.5
  //   }))
  // })
}

export function returnBook({ lendID }: ReturnRequest) {
  return Axios.post('/records/return', {
    lendID,
    adminID: useStore().id
  })
}