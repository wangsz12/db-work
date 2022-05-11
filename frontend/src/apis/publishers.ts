import Axios from "@/config/axios"

export function getPublisherDataBox() {
  return Axios.get('/data-box/publishers')
  // return mockAPIReturn({
  //   publishers: 52
  // })
}

export function getPublisherByPage(page = 1) {
  return Axios.get('/publishers', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 52,
  //   publishers: Array(10).fill('').map((_, index) => ({
  //     id: `P${('0000000' + (10 * page + index + 1)).slice(-7)}`,
  //     name: '人民邮电出版社',
  //     contact: '13012345678',
  //     address: 'XX市XX区XX路1号'
  //   }))
  // })
}

export function getPublisherByID(id: string) {
  return Axios.get(`/publishers/${id}`)
  // return mockAPIReturn({
  //   name: '人民邮电出版社'
  // })
}