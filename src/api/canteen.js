import request from "@/utils/request.js";

export const canteenListService = () => {
    return request.get('/canteen/all');
}

export const dishidListService = (dishid) => {
    const params = new URLSearchParams();
    // 只传递 email, password 和 nickname 字段
    params.append('id', dishid);
    // 构建带有查询参数的 URL
    const queryString = params.toString();
    const url = `/dish/id?${queryString}`;
    // 使用 GET 请求
    return request.get(url);
}