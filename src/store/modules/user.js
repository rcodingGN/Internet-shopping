// 引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from "@/api/user";
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from "@/utils/auth";
// 路由模块当中重置路由的方法
import { resetRouter,anyRoutes,asyncRoutes,constantRoutes } from "@/router";

// 箭头函数
const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: "",
    // 存储用户头像
    avatar: "",
    // 服务器返回的菜单信息
    routes:[],
    // 角色信息
    roles:[],
    // 按钮权限信息
    buttons:[],
    // 对比之后，项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由
    resultAsyncRoutes:[],

  };
};

//
const state = getDefaultState();

// 唯一修改state的地方
const mutations = { 
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  //   存储token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  //   存储用户名
//   SET_NAME: (state, name) => {
//     state.name = name;
//   },
//   //   存储用户头像
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar;
//   },
  //   存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限标记
    state.routes = userInfo.routes;
    // 按钮权限标记
    state.buttons = userInfo.buttons;
    // 角色
    state.roles = userInfo.roles;
  },
//   最终计算出的异步路由
SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    // vuex保存当前用户的异步路由，注意：一个用户需要展示完成路由，常量、异步、任意路由
    state.resultAsyncRoutes = asyncRoutes;

}
};
const computedAsyncRoutes = (asyncRoutes,routes)=>{
// 过滤出当前用户（超级管理员|普通员工）需要展示异步路由
asyncRoutes.filter(item=>{
    // 数组当中没有这个元素返回索引值-1，若有返回的索引值不一定是-1
    if (routes.indexOf(item.name)!=-1) {
        // 递归：还有2、3、4、5。。。级路由
        if (item.children&&item.children.length) {
            item.children = computedAsyncRoutes(item.children,routes);
        }
        return true
    }
})
}

const actions = {
  // user login  这里处理登陆业务
  //   login({ commit }, userInfo) {
  //     // 结构用户名与密码
  //     // promise().then().catch() 写法
  //     const { username, password } = userInfo
  //     return new Promise((resolve, reject) => {
  //       login({ username: username.trim(), password: password }).then(response => {
  //         const { data } = response
  //         commit('SET_TOKEN', data.token)
  //         setToken(data.token)
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })},

  // async(await) 写法
  async login({ commit }, userInfo) {
    // 解构用户名与密码
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    // console.log(result);
    // 目前登录使用的是mock数据，mock数据的code是20000
    if (result.code == 20000) {
      commit("SET_TOKEN", result.data.token);
      //   本地持久化存储
      setToken(result.data.token);
      return "OK";
    } else {
      return Promise.reject(new Error("false"));
    }
  },

  //获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          // 获取用户信息：返回的数据包含，用户名name、用户头像avatar、routes（返回的标志：不同的用户应该展示不同的菜单标记）、roles（用户角色信息）、buttons（按钮的信息：按钮权限用的标记）
          const { data } = response;

        //   if (!data) {
        //     return reject("Verification failed, please Login again.");
        //   }

        //   const { name, avatar } = data;

        //   commit("SET_NAME", name);
        //   commit("SET_AVATAR", avatar);
          commit("SET_USERINFO", data);
          commit("SET_RESULTASYNCROUTES",computedAsyncRoutes(asyncRoutes,data.routes))
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
