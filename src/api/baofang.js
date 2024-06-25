import request from "@/utils/request.js";

export const getAllroom = () => {
    return request.get('/reservation/all_private_room');
}

export const reserveRoom = (data) => {
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key]);
    }
    return request.post('/reservation/new_reservation',params);
}

export const getUserReserveList = (uid) => {
    const params = new URLSearchParams();
    params.append('uid', uid);
    const queryString = params.toString();
    const url = `/reservation/all_user?${queryString}`;
    return request.get(url);
}