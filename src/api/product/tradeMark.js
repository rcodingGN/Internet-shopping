// 这个模块主要获取品牌管理的接口
import request from '@/utils/request'
// 获取品牌列表接口
// URL：/admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: "get" });

// 处理添加品牌的操作
//  新增品牌 /admin/product/baseTrademark/save post  携带两个参数：tmname ，logo
// 切记：对于新增品牌给服务器传递数据时，不需要传递ID，ID是由服务器生成的

// 修改品牌 /admin/product/baseTrademark/update  put 携带三个参数：id，tmname，logo
// 切记：修改品牌的操作，前端的参数需要带上id，需要告诉服务器是哪个品牌
export const reqAddUpdateTradeMark = (tradeMark) => {
    // 带给服务器数据携带ID -- 修改
    if (tradeMark.id) {
        return request({ url: `/admin/product/baseTrademark/update`, method: "put", data: tradeMark })
    } else {
        return request({ url: `/admin/product/baseTrademark/save`, method: "post", data: tradeMark })
    }
};
// 删除品牌
// url：/admin/acl/permission/remove/{id}  mthod：delete  参数 id
export const reqDeleteTradeMark = (id) => request({url:`/admin/acl/permission/remove/${id}`, method:"delete"})