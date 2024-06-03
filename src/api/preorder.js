import request from '@/utils/request.js'

export function getPreorderList() {
  return request.get('/preorder')
}