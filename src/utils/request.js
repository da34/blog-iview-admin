import axios from 'axios'
import { Message } from 'view-design'
import store from '@/store'
import { getToken } from './cookie'

const isProd = process.env.NODE_ENV === 'production'
const baseURL = isProd ? '/api' : '/api/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true // send cookies when cross-domain requests
})

// 请求之前做点什么
instance.interceptors.request.use(
  config => {
    // 请求之前判断有无token
    // const token = getToken() || store.getters.token
    // if (token) {
    // config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  }, error => {
    return Promise.reject(error)
  })

// 请求成功之后
instance.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    Message.error(res.message)
    return Promise.reject(res.message || 'error')
  } else {
    return res
  }
}, error => {
  return Promise.reject(error)
})

export default instance
