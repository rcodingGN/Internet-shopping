import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }

};
const actions = {
    // 获取购物车列表的数组
    async getCartList({ commit }) {
        let result = await reqCartList();
        // 测试能否获取个人购物车列表
        // console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    // 删除购物车产品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "OK"
        } else {
            return "False"
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, skuId, isChecked) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        // console.log(result);

        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context：上下文，小仓库，commit，getters，dispatch，state
        // 获取购物车中全部的产品（是一个数组）
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : '';
            promiseAll.push(promise);
        });
        // 只要全部的数组元素都成功，返回结果即为成功，如果有一个失败，则失败
        return Promise.all(promiseAll)

    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // console.log(state);
        let promiseAll = [];
        let result = state.cartList[0].cartInfoList
        // console.log(result);
        result.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || [];
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}