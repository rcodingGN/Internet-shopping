// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import routes from './routes'

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
export default new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})