import request from '@/utils/request'

export function fetchList (query) {
  return request({
    url: '/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle (id) {
  return request({
    url: `/articles/${id}`,
    method: 'get',
  })
}

export function fetchPv (pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle (data) {
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export function updateArticle (data) {
  return request({
    url: `/articles/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteArticle (query) {
  return request({
    url: '/article/delete',
    method: 'delete',
    params: query
  })
}
export function searchArticle (query) {
  return request({
    url: '/article/search',
    method: 'get',
    params: query
  })
}
