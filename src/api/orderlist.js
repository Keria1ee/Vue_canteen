import request from "@/utils/request.js";

export function getOrderList(data) {
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key]);
    }
    const queryString = params.toString();
    const url = `/order/uid?${queryString}`;
  return request.get(url);
}

export function getDish(data) {
    const params = new URLSearchParams();
    params.append('id', data);
    const queryString = params.toString();
    const url = `/dish/id?${queryString}`;
  return request.get(url);
}

export function getDishList() {
    return request.get('/dish');
}