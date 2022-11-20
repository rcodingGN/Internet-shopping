// 对外暴露函数
// 设置token
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
};
// 获取token
export const getToken = (token) => {
    return localStorage.getItem("TOKEN")
};
// 清除本地存储的token
export const removeToken = () => {
    localStorage.removeToken("TOKEN")
};
