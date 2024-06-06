import request from '@/utils/request.js'
import {useTokenStore} from "@/stores/token.js";

export function getPreorderList() {
  return request.get('/dish/dish_with_stock')
}

export function addPreorder(data)
{const params = new URLSearchParams()
    for(let key in data){
        params.append(key,data[key]);
        console.log(data[key])
    }
  return request.post('/order/preorder', params)
}

export function buyPreorder(data)
{
  const params = new URLSearchParams()
  for(let key in data){
      params.append(key,data[key]);
  }
  return request.post('/order/new_order', params)
}

