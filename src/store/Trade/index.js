
import { reqAddressInfo, reqOrderInfo } from "@/api";
const state = {
    address: {},
    orderInfo: {},
}
const mutations = {
    GETADDRESS(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }

};
const actions = {
    // 获取地址信息
    async getAddress({ commit }) {
        let result = await reqAddressInfo();
        // console.log(result);
        if (result.code == 200) {
            commit('GETADDRESS', result.data)
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        // console.log('11', result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }

};
const getters = {


};

export default {
    state,
    mutations,
    actions,
    getters
}