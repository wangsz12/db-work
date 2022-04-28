import { mockAPIReturn } from "@/utils"

export function getRecentRecord() {
  return mockAPIReturn([
    {
      key: '1',
      status: '借出',
      cardID: '1000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      deadline: '2022-05-26',
      isOverdue: false
    },
    {
      key: '2',
      status: '借出',
      cardID: '1000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      deadline: '2022-05-26',
      isOverdue: false
    },
    {
      key: '3',
      status: '借出',
      cardID: '1000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      deadline: '2022-05-26',
      isOverdue: false
    },
    {
      key: '4',
      status: '借出',
      cardID: '1000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      deadline: '2022-05-26',
      isOverdue: false
    },
    {
      key: '5',
      status: '借出',
      cardID: '1000001',
      name: '图解HTTP',
      author: '[日]上野 宣',
      deadline: '2022-05-26',
      isOverdue: false
    }
  ])
}

export function getBookDataBox() {
  return mockAPIReturn({
    books: 1564,
    lend: 745,
    categories: 4
  })
}

export function getBooksByPage(page = 1) {
  console.log('page: ', page)
  return mockAPIReturn({
    total: 1564,
    books: Array(10).fill('').map((_, index) => ({
      id: `B${('0000000' + (10 * page + index + 1)).slice(-7)}`,
      name: '图解HTTP',
      author: '[日]上野 宣',
      quantity: 10,
      category: '计算机/网络',
      publisher: '人民邮电出版社',
      isbn: '9798115351531'
    }))
  })
}

export function getBookByID(id: string) {
  console.log('id: ', id)
  return mockAPIReturn({
    id,
    name: '图解HTTP',
    author: '[日]上野 宣',
    isbn: '9798115351531'
  })
}