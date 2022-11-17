import Vue from 'vue';
import Vuex from 'vuex';

// 使用插件
Vue.use(Vuex);
import home from './home';
import search from './search';
import detail from './Detail'


// state:仓库存储数据的地方
// const state = {
//     count: 1,
// };

// mutatios:修改state的唯一手段
// const mutations = {
//     ADD(state) {
//         state.count++;
//     }
// };

// actions:处理action，可以书写自己的业务逻辑，处理异步
// const actions = {
//     // 可以书写业务逻辑，但是不能修改state
//     add({ commit }) {
//         commit('ADD')
//     }
// };

//getters: 理解为计算属性，用户简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {};


// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})