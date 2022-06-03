import Axios from "@/config/axios"
import { CreateCardRequest } from "@/utils/types"

export function getCardDataBox() {
  return Axios.get('/data-box/cards')
}

export function getCardsByPage(page = 1) {
  return Axios.get('/cards', {
    params: {
      page
    }
  })
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
}