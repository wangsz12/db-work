import Axios from "@/config/axios"

export function getRecentRecords() {
  return Axios.get('/records')

  // return mockAPIReturn(Array(10).fill('').map((_, index) => ({
  //   key: String(index),
  //   status: '借出',
  //   date: '2022-04-26',
  //   cardID: '1000001',
  //   name: '图解HTTP',
  //   author: '[日]上野 宣',
  //   deadline: '2022-05-26',
  //   isOverdue: false
  // })))
}