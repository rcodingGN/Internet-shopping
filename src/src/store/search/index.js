import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取Search模块数据
    async getSearchList({ commit }, params = {}) {
        // reqGetSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
// 计算属性，在项目当中为了简化仓库中的数据
// 可以把我们将来在组件当中需要用的数据进行简化（组件在获取数据的时候将被简化）
const getters = {
    // 当前形参state是当前search中的state，并非大仓库（包含home与search）中的state
    goodsList(state) {
        // 返回的数据可能是服务器中的对象，也可能是undefined
        // 假如网络差或者没有网络，goodsList将返回undefined，所以应该让这种情况返回空数组

        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}