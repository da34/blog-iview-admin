import * as qiniu from 'qiniu-js'
import { getToken } from '@/api/qiniu'

// 上传文件到七牛云
export const uploadFile = file => {
  return new Promise(async (resolve, reject) => {
    const observer = {
      next (res) {
        // console.log(res)
      },
      error (err) {
        reject(err)
      },
      complete (res) {
        resolve(res)
      }
    }
    const { uploadToken } = await getToken() // 获取上传token
    const { name } = file
    const observable = qiniu.upload(file, name, uploadToken)
    observable.subscribe(observer) // 上传开始
  })
}
