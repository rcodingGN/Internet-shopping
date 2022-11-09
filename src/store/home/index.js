import { reqCategoryList, reqGetbannerList } from "@/api";
// home模块的小仓库
const state = {
    // state中数据默认初始值不能瞎写，服务器返回对象和数组，根据接口返回值初始化
    categoryList: [],
    // getBannerList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    // GETBANNERLIST(state,getBannerList){
    //     state.getBannerList = getBannerList;
    // }

};
const actions = {
    // 通过api里的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetbannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST',result.data);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}