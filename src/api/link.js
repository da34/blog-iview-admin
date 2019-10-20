import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/links',
    method: 'get',
    params
  })
}

export function update (data) {
  return request({
    url: `/links/${data.id}`,
    method: 'put',
    data
  })
}

export function create (data) {
  return request({
    url: '/links',
    method: 'post',
    data
  })
}
