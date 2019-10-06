import axios from 'axios'
import { Message } from 'iview'
const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000
})

// 请求之前做点什么
instance.interceptors.request.use(
  config => {
    // 请求之前判断有无token
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
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
