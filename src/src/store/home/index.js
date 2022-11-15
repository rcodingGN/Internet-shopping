import { reqCategoryList, reqGetbannerList,reqFloorList } from "@/api";
// home模块的小仓库
const state = {
    // state中数据默认初始值不能瞎写，服务器返回对象和数组，根据接口返回值初始化
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor的数据
    floorList:[],

};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
        // console.log("修改仓库中的bannerList数据");
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;

    }

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
    async getBannerList({ commit }) {
        // console.log("向服务器发起ajax请求，获取轮播图数据");
        let result = await reqGetbannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            // 提交mutations
            commit('GETFLOORLIST',result.data);
        }
    },
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}