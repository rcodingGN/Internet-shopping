
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
    // 获取结算页面商品信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        // console.log('11', result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    },
    // async submitOrder({ commit }, tradeNo, data) {
    //     let result = await reqSubmitOrder(tradeNo, data);
    //     if (result.code == 200) {
    //         this.orderId = result.data;
    //         // 路由跳转：传递参数
    //         this.$router.push(`/pay?orderId` + this.orderId);
    //     } else {
    //         alert(result.code)
    //     }
    // }

};
const getters = {


};

export default {
    state,
    mutations,
    actions,
    getters
}