import Axios from "@/config/axios"
import { CreateCardRequest } from "@/utils/types"

export function getCardDataBox() {
  return Axios.get('/data-box/cards')
  // return mockAPIReturn({
  //   total: 1536,
  //   male: 792,
  //   female: 1536 - 792
  // })
}

export function getCardsByPage(page = 1) {
  return Axios.get('/cards', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 1536,
  //   cards: Array(10).fill('').map((_, index) => ({
  //     id: `1${('0000000' + (10 * page + index + 1)).slice(-7)}`,
  //     name: '李华',
  //     gender: '男',
  //     contact: '13012345678',
  //     address: 'XX市XX区XX路XX小区',
  //     haveLent: 12
  //   }))
  // })
}

export function deleteCardByID(id: string){
  return Axios.delete('/cards', {
    params: {
      id
    }
  })
}

export function createCard({ name, gender, contact, address }: CreateCardRequest) {
  return Axios.post('/cards', {
    name,
    gender,
    contact,
    address
  })
  // return mockAPIReturn({
  //   id: 'R000001'
  // })
}