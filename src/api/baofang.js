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