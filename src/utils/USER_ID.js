//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
//封装函数:只能生成一次用户临时身份
// let userId;
// export const SET_USERID = () => {
//     userId = localStorage.getItem('USERTEMPID');
//     if (!userId) {
//         userId = uuidv4();
//         localStorage.setItem('USERTEMPID', userId);
//     }
//     return userId;
// }
export const getUUID = () => {
    // 先从本地储存获取uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 如果没有生成
    if (!uuid_token) {
        // 生成游客临时身份
        uuid_token = uuidv4();
        // 本地储存一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 切记需要有返回值，不然就是undefined
    return uuid_token
}
