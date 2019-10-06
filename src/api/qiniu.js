import request from '@/utils/request'

export function getToken () {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
// Invalid
function uploadFile (formData) {
  return request({
    url: '/qiniu/upload/file', // 假地址 自行替换
    method: 'post',
    data: formData
  })
}
