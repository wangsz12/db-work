import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useRouter } from "vue-router"

const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  timeout: 10000
})

Axios.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token: string | null = localStorage.getItem('token')
    if (token && req.headers) {
      req.headers.Authorization = token
    }
  
    return req
  },
  (err: Error) => {
    return Promise.reject(err)
  }
)

Axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.headers.Authorization) {
      localStorage.setItem('token', res.headers.Authorization)
    }
  
    if (res.data.status !== true) {
      return Promise.reject(res)
    }
  
    return res
  },
  (err: Error) => {
    if (err.message.startsWith('timeout')) {
      err.message = '请求超时，请检查网络'
    }
    if (err.message.endsWith('401')) {
      err.message = '身份已过期，请重新登录'
      useRouter().push('/login')
    }
  
    return Promise.reject(err)
  }
)

export default Axios;