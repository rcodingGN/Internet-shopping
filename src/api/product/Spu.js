import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}   get 参数：page，limit，category3Id 
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}});