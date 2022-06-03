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
}

export function getFineRecordsByCardID(id: string) {
  return Axios.get(`/fines/card/${id}`)
}

export function getFineRecordsByID(id: string) {
  return Axios.get(`/fines/${id}`)
}

export function payFine(id: string) {
  return Axios.patch('/fines', {
    id
  })
}