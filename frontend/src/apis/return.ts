import { mockAPIReturn } from "@/utils"
import { ReturnRequest } from "@/utils/types"

export function returnBook({cardID, lendID}: ReturnRequest) {
  console.log('cardID, lendID: ', cardID, lendID)
  return mockAPIReturn()
}

export function getReturnRecordByPage(page = 1) {
  return mockAPIReturn({
    total: 235,
    records: Array(10).fill('').map((_, index) => ({
      id: `R${('0000000' + (10 * page + index + 1)).slice(-7)}`,
      book: {
        id: 'B000001',
        name: '图解HTTP',
        author: '[日]上野 宣'
      },
      cardID: '1000001',
      date: '2022-04-28',
      isOverdue: Math.random() > 0.5,
      fine: 3.26,
      paid: Math.random() > 0.5
    }))
  })
}