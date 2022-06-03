import Axios from "@/config/axios"

export function getRecentRecords() {
  return Axios.get('/records')
}