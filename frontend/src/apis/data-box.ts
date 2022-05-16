import Axios from "@/config/axios"

export function getIndexDataBox() {
  return Axios.get('/data-box/index')
  // return mockAPIReturn({
  //   books: 1564,
  //   readers: 745,
  //   lend: 545,
  //   unpaidFine: 76
  // })
}