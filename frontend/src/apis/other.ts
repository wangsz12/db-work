import Axios from "@/config/axios"
import { mockAPIReturn } from "@/utils"

export function getIndexDataBox() {
  // return Axios.get()
  return mockAPIReturn({
    books: 1564,
    readers: 745,
    lend: 545,
    unpaidFine: 976
  })
}