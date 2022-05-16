import Axios from "@/config/axios"

export function login(account: string, password: string) {
  return Axios.post('/auth/login', {
    account,
    password
  })
}