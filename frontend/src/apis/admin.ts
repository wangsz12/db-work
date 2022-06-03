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
}

export function deleteAdminByID(id: string) {
  return Axios.delete('/admin', {
    params: {
      id
    }
  })
}

export function createAdmin({ name, account, password }: CreateAdminRequest) {
  return Axios.post('/admin', {
    name,
    account,
    password
  })
}

export function changePwd(id: string, prev: string, newPwd: string) {
  return Axios.patch('/admin', {
    id,
    prev,
    newPwd
  })
}