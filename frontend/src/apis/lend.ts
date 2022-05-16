import Axios from "@/config/axios"
import { LendRequest } from "@/utils/types"

export function getLendRecordsByPage(page = 1) {
  return Axios.get('/records/lend', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 476,
  //   records: Array(10).fill('').map((_, index) => ({
  //     id: `L${('0000000' + (10 * page + index + 1)).slice(-7)}`,
  //     book: {
  //       id: 'b000001',
  //       name: '图解HTTP',
  //       author: '[日]上野 宣'
  //     },
  //     cardID: '1000001',
  //     date: '2022-04-26',
  //     duration: 2
  //   }))
  // })
}

export function lend({cardID, bookID, duration}: LendRequest) {
  return Axios.post('/records/lend', {
    cardID,
    bookID,
    duration
  })
  // return mockAPIReturn()
}

export function getLendRecordsByCardID(cardID: string) {
  return Axios.get(`/records/lend/card/${cardID}`)
  // return mockAPIReturn([
  //   {
  //     id: '1',
  //     record: '图解HTTP / [日]上野 宣 / 2022-04-26'
  //   }
  // ])
}

export function getLendRecordsByID(id: string) {
  return Axios.get(`/records/lend/${id}`)
//   return mockAPIReturn({
//     id: 'L000001',
//     record: '图解HTTP / [日]上野 宣 / 2022-04-26',
//     book: {
//       id: 'B000001',
//       name: '图解HTTP',
//       author: '[日]上野 宣',
//       isbn: '9798115351531'
//     },
//     date: '2022-04-26',
//     duration: 2,
//     isOverdue: true,
//     fine: 30.26
//   })
}