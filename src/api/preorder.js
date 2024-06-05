import request from '@/utils/request.js'
import {useTokenStore} from "@/stores/token.js";

export function getPreorderList() {
  return request.get('/dish/dish_with_stock')
}

export function addPreorder(data) {
    const token = useTokenStore().token;
  return request.post('/preorder', data)
}

