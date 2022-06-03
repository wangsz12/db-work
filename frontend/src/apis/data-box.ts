import Axios from "@/config/axios"

export function getIndexDataBox() {
  return Axios.get('/data-box/index')
}