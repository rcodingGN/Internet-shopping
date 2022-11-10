// 当前模块用来对所有的API进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get请求 无参数
// axios发请求返回的结果是promise对象
export const reqCategoryList = () => {
    // 发请求
    return requests({ url: '/product/getBaseCategoryList', method: 'get' }) // 因为在request.js中已经注明了 baseURL:'/api',所以这里不需要再次输入api
}
// export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');

// 获取banner（home首页轮播图）
export const reqGetbannerList =() => {
    // 发请求
    return mockRequests({url:'/banner',method:'get'})
};
// export const reqGetbannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// export const reqFloorList =() => {
//     // 发请求
//     return mockRequests({url:'/floor',method:'get'})
// };