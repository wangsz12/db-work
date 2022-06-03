import Axios from "@/config/axios"
import { LendRequest } from "@/utils/types"

export function getLendRecordsByPage(page = 1) {
  return Axios.get('/records/lend', {
    params: {
      page
    }
  })
}

export function lend({cardID, bookID, duration}: LendRequest) {
  return Axios.post('/records/lend', {
    cardID,
    bookID,
    duration
  })
}

export function getLendRecordsByCardID(cardID: string) {
  return Axios.get(`/records/lend/card/${cardID}`)
}

export function getLendRecordsByID(id: string) {
  return Axios.get(`/records/lend/${id}`)
}