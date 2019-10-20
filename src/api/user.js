import request from '@/utils/request'

// 登录
const login = data => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

const getInfo = () => {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}

const getUserList = query => {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}
const update = data => {
  return request({
    url: `/users/${data.id}`,
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
