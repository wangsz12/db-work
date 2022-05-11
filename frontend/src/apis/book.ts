import Axios from "@/config/axios"
import { mockAPIReturn } from "@/utils"
import { PurchaseRequest } from "@/utils/types"

// TODO 替换为真实接口
export function getRecentRecord() {
  return mockAPIReturn(Array(10).fill('').map((_, index) => ({
    key: String(index),
    status: '借出',
    cardID: '1000001',
    name: '图解HTTP',
    author: '[日]上野 宣',
    deadline: '2022-05-26',
    isOverdue: false
  })))
}

export function getBookDataBox() {
  return Axios.get('/data-box/books')
  // return mockAPIReturn({
  //   books: 1564,
  //   lend: 745,
  //   categories: 4
  // })
}

export function getBooksByPage(page = 1) {
  return Axios.get('/books', {
    params: {
      page,
    }
  })
  // return mockAPIReturn({
  //   total: 1564,
  //   books: Array(10).fill('').map((_, index) => ({
  //     id: `B${('0000000' + (10 * page + index + 1)).slice(-7)}`,
  //     name: '图解HTTP',
  //     author: '[日]上野 宣',
  //     quantity: 10,
  //     category: '计算机/网络',
  //     publisher: '人民邮电出版社',
  //     isbn: '9798115351531'
  //   }))
  // })
}

export function getBookByID(id: string) {
  return Axios.get(`/books/${id}`)
  // return mockAPIReturn({
  //   id,
  //   name: '图解HTTP',
  //   author: '[日]上野 宣',
  //   isbn: '9798115351531',
  //   price: 75.26
  // })
}

export function getBooksByPublisher(pid: string) {
  return Axios.get(`/books/publisher/${pid}`)
  // return mockAPIReturn(Array(3).fill('').map((_, index) => ({
  //   id: `B${('0000000' + (index + 1)).slice(-7)}`,
  //   record: '图解HTTP / [日]上野 宣'
  // })))
}

export function purchase({ bookID, quantity }: PurchaseRequest) {
  return Axios.patch('/books/purchase', {
    bookID,
    quantity
  })
}