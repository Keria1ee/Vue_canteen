//导入request.js请求工具
import request from '../utils/request.js'

//提供调用注册接口的函数
// export const userRegisterService = (registerData)=>{
//     //借助于UrlSearchParams完成传递
//     const params = new URLSearchParams()
//     for(let key in registerData){
//         params.append(key,registerData[key]);
//     }
//     return request.get('/user/register',params);
// }
export const userRegisterService = (registerData) => {
    // 创建一个新的 URLSearchParams 实例
    const params = new URLSearchParams();
    // 只传递 email, password 和 nickname 字段
    const allowedFields = ['email', 'password', 'name'];
    for (let key in registerData) {
        if (allowedFields.includes(key)) {
            params.append(key, registerData[key]);
        }
    }
    // 构建带有查询参数的 URL
    const queryString = params.toString();
    const url = `/user/register?${queryString}`;
    // 使用 GET 请求
    return request.get(url);
}


export const userLoginService = (loginData)=>{
    const params = new URLSearchParams()
    const allowedFields = ['email', 'password'];
    for(let key in loginData){
        if (!allowedFields.includes(key)) {
            continue;
        }
        params.append(key,loginData[key]);
    }
    return request.post('/user/login',params);
}

export const rePasswordService = (rePasswordData)=>{
    const params = new URLSearchParams()
    const allowedFields = ['email', 'password'];
    for(let key in rePasswordData){
        if (!allowedFields.includes(key)) {
            continue;
        }
        params.append(key,rePasswordData[key]);
    }
    return request.post('/user/repassword',params);
}