import request from '@/utils/request'

export function fetchTagList (query) {
  return request({
    url: '/tag/total',
    method: 'get',
    params: query
  })
}

export function createTag (data) {
  return request({
    url: '/tag/create',
    method: 'post',
    data
  })
}

export function deleteTag (query) {
  return request({
    url: '/tag/delete',
    method: 'delete',
    params: query
  })
}
