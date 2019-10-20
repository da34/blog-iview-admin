import request from '@/utils/request'

export function fetchList (query) {
  return request({
    url: '/categories',
    method: 'get',
    params: query
  })
}

export function createCategory (data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function deleteCategory (id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  })
}
