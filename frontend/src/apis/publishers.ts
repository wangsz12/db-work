import Axios from "@/config/axios"
import { CreatePublisherRequest } from "@/utils/types"

export function getPublisherDataBox() {
  return Axios.get('/data-box/publishers')
}

export function getPublisherByPage(page = 1) {
  return Axios.get('/publishers', {
    params: {
      page
    }
  })
}

export function getPublisherByID(id: string) {
  return Axios.get(`/publishers/${id}`)
}

export function createPublisher({ name, contact, address }: CreatePublisherRequest) {
  return Axios.post('/publishers', {
    name,
    contact,
    address
  })
}

export function deletePublisherByID(id: string) {
  return Axios.delete('/publishers', {
    params: {
      id
    }
  })
}