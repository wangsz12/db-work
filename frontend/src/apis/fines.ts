import Axios from "@/config/axios"

export function getFinesDataBox() {
  return Axios.get('/data-box/fines')
}

export function getFines(page = 1) {
  return Axios.get('/fines', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 67,
  //   fines: Array(10).fill('').map((_, index) => ({
  //     id: `f${('00000' + (10 * page + index + 1)).slice(-5)}`,
  //     cardID: '1000001',
  //     bookID: 'b0000001',
  //     name: '图解HTTP',
  //     author: '[日]上野 宣',
  //     amount: 3.27,
  //     paid: false
  //   }))
  // })
}

export function getFineRecordsByCardID(id: string) {
  return Axios.get(`/fines/card/${id}`)
  // return mockAPIReturn([
  //   {
  //     id: 'F00001',
  //     record: '图解HTTP / [日]上野 宣 / ￥3.27'
  //   }
  // ])
}

export function getFineRecordsByID(id: string) {
  return Axios.get(`/fines/${id}`)
  // return mockAPIReturn({
  //   id: 'F00001',
  //   record: '图解HTTP / [日]上野 宣 / ￥3.27',
  //   book: {
  //     id: 'b000001',
  //     name: '图解HTTP',
  //     author: '[日]上野 宣',
  //     isbn: '9798115351531'
  //   },
  //   fine: 3.27
  // })
}

export function payFine(id: string) {
  return Axios.patch('/fines', {
    id
  })
}