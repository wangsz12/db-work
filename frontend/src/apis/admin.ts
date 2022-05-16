import Axios from "@/config/axios"
import { CreateAdminRequest } from "@/utils/types"

export function getAdminDataBox() {
  return Axios.get('/data-box/admin')
}

export function getAdminByPage(page = 1) {
  return Axios.get('/admin', {
    params: {
      page
    }
  })
  // return mockAPIReturn({
  //   total: 32,
  //   admin: Array(10).fill('').map((_, index) => ({
  //     id: String(index),
  //     name: 'xxx',
  //     account: 'admin'
  //   }))
  // })
}

export function deleteAdminByID(id: string) {
  return Axios.delete('/admin', {
    params: {
      id
    }
  })
  // return mockAPIReturn()
}

export function createAdmin({ name, account, password }: CreateAdminRequest) {
  return Axios.post('/admin', {
    name,
    account,
    password
  })
  // return mockAPIReturn({
  //   id: 'A0002'
  // })
}

export function changePwd(id: string, prev: string, newPwd: string) {
  return Axios.patch('/admin', {
    id,
    prev,
    newPwd
  })
  // return mockAPIReturn()
}