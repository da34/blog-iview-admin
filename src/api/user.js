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
const getUserList = query => {
  return request({
    url: 'auth/list',
    method: 'get',
    params: query
  })
}
const update = data => {
  return request({
    url: 'auth/update',
    method: 'put',
    data
  })
}

export {
  login,
  getInfo,
  getUserList,
  update
}
