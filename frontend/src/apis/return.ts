import Axios from "@/config/axios"
import { useStore } from "@/store"
import { ReturnRequest } from "@/utils/types"

export function getReturnRecordByPage(page = 1) {
  return Axios.get('/records/return', {
    params: {
      page
    }
  })
}

export function returnBook({ lendID }: ReturnRequest) {
  return Axios.post('/records/return', {
    lendID,
    adminID: useStore().id
  })
}