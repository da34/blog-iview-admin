import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/link/list',
    method: 'get',
    params
  })
}

export function update (data) {
  return request({
    url: '/link/update',
    method: 'put',
    data
  })
}
export function search (data) {
  return request({
    url: '/link/search',
    method: 'get',
    params: data
  })
}
export function create (data) {
  return request({
    url: '/link/create',
    method: 'post',
    data
  })
}
