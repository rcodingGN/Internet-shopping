import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
const state = {
    goodsInfo: {},
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },

}
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的解构
        /* 
            加入购物车以后，前台将参数带给服务器
            服务器写入数据成功，并不会返回其他数据，只是返回code = 200，代表这次操作成功
            因为服务没有返回其他数据，所以仓库不需要三连环
        */
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前的函数如果执行则返回promise，但是我们需要返回成功 | 失败的结果
        if (result.code == 200) {
            // 代表加入购物车成功
            return "OK"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('false'));
        }



    }
}
const getters = {
    // 路径导航简化的信息
    categoryView(state) {
        // state.goodsInfo初始状态为空对象，空对象的categoryView属性值为undefined  后面改为 || {}  让categoryView至少为空对象，就不会报错了
        return state.goodsInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    // 简化商品售卖属性的数据
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}