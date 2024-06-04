import request from "@/utils/request.js";

export const canteenListService = () => {
    return request.get('/canteen/all');
}