import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}   get 参数：page，limit，category3Id 
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}});

// 获取spu信息
// /admin/product/getSpuById/{spuId}  get 参数：spuId
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'});

// 获取品牌信息
// /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () => request({ulr:'/admin/product/baseTrademark/getTrademarkList',method:'get'});

// 获取SPU图片借口
// /admin/product/spuImageList/{spuId}  get 参数：spuid
export const reqSpuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});

// 获取平台全部销售属性  -- 整个平台的销售属性 一共是三个
// /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'get'});
