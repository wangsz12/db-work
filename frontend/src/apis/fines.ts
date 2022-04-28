import { mockAPIReturn } from "@/utils"
import { PayFineRequest } from "@/utils/types"

export function getFines(page = 1) {
  console.log('page: ', page)
  return mockAPIReturn({
    total: 67,
    fines: Array(10).fill('').map((_, index) => ({
      id: `f${('00000' + (10 * page + index + 1)).slice(-5)}`,
      cardID: '1000001',
      bookID: 'b0000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      amount: 3.27,
      paid: false
    }))
  })
}

export function getFineRecordsByCardID(cardID: string) {
  console.log('cardID: ', cardID)
  return mockAPIReturn([
    {
      id: 'F00001',
      record: '图解HTTP / [日]上野 宣 / ￥3.27'
    }
  ])
}

export function getFineRecordsByID(id: string) {
  console.log('id: ', id)
  return mockAPIReturn({
    id: 'F00001',
    record: '图解HTTP / [日]上野 宣 / ￥3.27',
    book: {
      id: 'b000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      isbn: '9798115351531'
    },
    fine: 3.27
  })
}

export function payFine({cardID, fineID}: PayFineRequest) {
  console.log('cardID, fineID: ', cardID, fineID)
  return mockAPIReturn()
}