// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
// start：进度条开始 done：进度条结束
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
/**
 *  1.利用axios对象的方法create创建一个axios实例
 *  2.mockRequest就是axios，需要配置一下
 * 
 */
const mockRequests = axios.create({
    // 配置对象
    // 基础路径：发送请求的时候，路径当中会出现api
    baseURL: "/mock",
    // 请求超时的时间为 5秒 
    timeout: 5000
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，在请求发出去之前可以做一些事情
mockRequests.interceptors.request.use((config) => {
    // 进度条开始动
    nprogress.start();
    // config：为配置对象，对象中有一个Header属性很重要
    return config;
});
// 响应拦截器
mockRequests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来后，拦截器可以检测到并做一些事情
    return res.data;

}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new error('false'))
});





// 对外暴露
export default mockRequests;
