import { reqCartList } from "@/api";
const state = {

};
const mutations = {


};
const actions = {
    // 获取购物车列表的数组
    async getCartList({ commit }) {
        let result = await reqCartList();
        // 测试能否获取个人购物车列表
        console.log(result);
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}