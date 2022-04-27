import { mockAPIReturn } from "@/utils"
import { LendRequest } from "@/utils/types"

export function lend({cardID, bookID, duration}: LendRequest) {
  console.log('cardID, bookID, duration: ', cardID, bookID, duration)
  return mockAPIReturn()
}

export function getLendRecordsByCardID(cardID: string) {
  console.log('cardID: ', cardID)
  return mockAPIReturn([
    {
      id: '1',
      record: '图解HTTP / [日]上野 宣 / 2022-04-26'
    }
  ])
}

export function getLendRecordsByID(id: string) {
  console.log('id: ', id)
  return mockAPIReturn({
    id: 'b000001',
    record: '图解HTTP / [日]上野 宣 / 2022-04-26',
    book: {
      id: 'b000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      isbn: '9798115351531'
    },
    date: '2022-04-26',
    duration: 2,
    isOverdue: true,
    fine: 30.26
  })
}

