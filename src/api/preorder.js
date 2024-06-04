import request from '@/utils/request.js'
import {useTokenStore} from "@/stores/token.js";

export function getPreorderList() {
    const token = useTokenStore().token;
  return request.get('/preorder')
}

export function addPreorder(data) {
    const token = useTokenStore().token;
  return request.post('/preorder', data)
}