import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useRouter } from "vue-router"

const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://dbwork.wangsz12.top/api',
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
    if (res.data.status === false) {
      return Promise.reject(new Error(res.data.msg))
    }
  
    return res
  },
  (err: Error) => {
    if (err.message.startsWith('timeout')) {
      err.message = '请求超时，请检查网络'
    }
    if (err.message === 'Network Error') {
      err.message = '网络错误'
    }
    if (err.message.endsWith('401')) {
      err.message = '身份已过期，请重新登录'
      useRouter().push('/login')
    }
  
    return Promise.reject(err)
  }
)

export default Axios