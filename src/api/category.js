import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/category/list',
    method: 'get',
    params: query
  })
}
export function createCategory(data) {
  return request({
    url: '/category/create',
    method: 'post',
    data
  })
}
export function deleteCategory(query) {
  return request({
    url: '/category/delete',
    method: 'delete',
    params: query
  })
}
