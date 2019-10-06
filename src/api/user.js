import request from '@/utils/request'

// 登录
const login = data => {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}
const getInfo = () => {
  return request({
    url: 'auth/user/info',
    method: 'get'
  })
}

export {
  login,
  getInfo
}
