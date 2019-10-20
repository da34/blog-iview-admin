import request from '@/utils/request'

export function fetchTagList (query) {
  return request({
    url: '/tags',
    method: 'get',
    params: query
  })
}

export function createTag (data) {
  return request({
    url: '/tags',
    method: 'post',
    data
  })
}

export function deleteTag (id) {
  return request({
    url: `/tags/${id}`,
    method: 'delete'
  })
}
