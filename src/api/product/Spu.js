import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}   get 参数：page，limit，category3Id 
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } });

// 获取spu信息
// /admin/product/getSpuById/{spuId}  get 参数：spuId
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' });

// 获取品牌信息
// /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' });

// 获取SPU图片借口
// /admin/product/spuImageList/{spuId}  get 参数：spuid
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 获取平台全部销售属性  -- 整个平台的销售属性 一共是三个
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' });

// 修改SPU|添加SPU  对于修改或添加:携带给服务器参数大致是一致的，唯一区别就是参数是否有id
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        // 携带的参数有id 修改spu
        return request({ url: "/admin/product/updateSpuInfo", method: 'post', data: spuInfo });
    } else {
        // 携带的参数没有id 添加spu
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
};

// 删除spu
// /admin/product/deleteSpu/{spuId}  delete 参数：spuid
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 获取图片接口
// /admin/product/spuImageList/{spuId}  method:get  
export const reqSpuSkuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId}    method：get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' });

// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加SKU
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

// 获取sku列表数据的接口
// /admin/product/findBySpuId/{spuId}   get
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})


