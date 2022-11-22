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
export const reqGetbannerList = () => {
    // 发请求
    return mockRequests({ url: '/banner', method: 'get' })
};
// export const reqGetbannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// export const reqFloorList =() => {
//     // 发请求
//     return mockRequests({url:'/floor',method:'get'})
// };

// 获取搜索模块数据  地址：/api/list   请求方式：post  
/* 
    参数：需要带十个参数
    {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/

// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchInfo = (params) => requests({
    url: "/list", method: "post", data: params,
});

// 获取产品详情信息的接口  URL： /api/item/{skuId}  请求方式 get  参数 goods.id
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });


// 获取购物车列表的数据接口
// URL：/api/cart/cartList  请求方式：Get
export const reqCartList = () => requests({ url: '/cart/cartList', method: "get" });

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 修改商品的选中状态
export const reqUpdateCheckedById = ({ skuId, isChecked }) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取注册验证码
// url：/user/passport/sendCode/{phone}  请求方式：get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

// 完成注册
// url：/user/passport/register 请求方式：post  参数：phone，password，code
export const reqUserReigster = (data) => requests({ url: '/user/passport/register', method: 'post', data });

// 登录
// url:/user/passport/login method：post
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data });

// 获取用户信息(需要带着用户token)
// url: /user/passport/auth/getUserInfo      method：get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

// 退出登录
// url：/user/passport/logout  method：get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' });

// 获取用户地址信息
// url:/user/userAddress/auth/findUserAddressList method:get
// export const reqAddressInfo = () => mockRequests({ url: '/address', method: 'get' })
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取交易页商品数据
// url:/order/auth/trade method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });
// export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/shopTrade?tradeNo=${tradeNo}`, method: 'post', data });

//获取支付信息接口
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//查询支付结果
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取我的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
