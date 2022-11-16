import { reqGoodsInfo } from "@/api";
const state = {
    goodsInfo: {},
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    }
}
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
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