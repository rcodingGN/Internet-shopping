import { reqGetCode, reqUserReigster, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
// import {getToken, removeToken, setToken} from '@/utils/token'
const state = {
    code: '',
    // 持久化存储方法一：
    token: localStorage.getItem("TOKEN"),
    // 持久化存储方法二: 
    // token:getToken(),
    userInfo: {},

};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = "",
            state.userInfo = {},
            // 方法一：
            localStorage.removeItem("TOKEN");
        // 方法二：
        // removeToken()
    }

};
const actions = {
    // 获取注册验证码
    async getCode({ commit }, phone) {
        // 获取验证码接口，接收验证码，但正常情况是由后台将验证码发送到用户手机
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserReigster(user);
        // console.log(result);
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // console.log('登录业务', result); // 返回一个token，服务器给的，唯一标识符,
        if (result.code == 200) {
            // 用户已经登录成功且成功获取token
            commit('USERLOGIN', result.data.token);
            // 持久化存储 localStorage
            // 持久化存储方法一：
            localStorage.setItem('TOKEN', result.data.token);
            // 持久化存储方法二：多此一举
            // setToken(result.state.token);
            return "ok"
        } else {
            return Promise.reject(new Error('false'));
        }
    },
    // 获取登录信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log("登录信息", result);
        // if (result.code == 200) {
        //     commit('GETUSERINFO', result.data)
        //     return "OK"
        // } else {
        //     return Promise.reject(new Error('false'))
        // }
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发请求
        let result = await reqLogout();
        if (result.code == 200) {
            // action不可以操作state，提交mutation修改state
            commit('CLEAR')
            return "OK"
        } else {
            return Promise.reject(new Error('false'))
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