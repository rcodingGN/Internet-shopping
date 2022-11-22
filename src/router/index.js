// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import routes from './routes'
import store from '@/store'

// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push
// 第一个参数：告诉原来的push方法，往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this);
    if (resolve || reject) {
        originPush.call(this, location, resolve, reject)
        /**
         * call与apply区别
         * 相同点：都可以调用函数与篡改函数的上下文一次
         * 不同点：call与apply传递参数：call传递参数用逗号隔开，apply传递参数为数组
         * 
         * */
    } else {
        originPush.call(this, location, () => { }, () => { })
    }

};
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    // console.log(this);
    if (resolve || reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }

};

// 配置路由
let router = new VueRouter({
    mode: 'hash',
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//全局守卫:只要项目中有任何路由变化，全局守卫都会进行拦截【符合条件走你，不符合条件不能访问】

//全局守卫:全局前置守卫【访问之前进行触发】

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login" || to.path == '/register') {
            next('/');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);  // 把未登录时候想去丹没有去成的信息，存储于地址栏中【路由】
        } else {
            next();
        }
    }
});


//全局后置守卫,几乎不用
// router.afterEach((to,from)=>{
//   console.log('后置守卫');
// })

export default router;
