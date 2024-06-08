import request from "@/utils/request.js";

export const commentListService = () => {
    return request.get(`/comment/get_all_comments`);
}

export function getDishList() {
    return request.get('/dish');
}

export function addComment(data) {
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key]);
    }
    return request.post('/comment/add_comment', params);
}