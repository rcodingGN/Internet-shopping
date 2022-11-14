import Vue from 'vue';
import App from './App.vue';
//关闭Vue的生产提示
Vue.config.productionTip = false
// 三级联动组件 -- 全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图 --- 全局组件
import Carousel from '@/components/Carousel'
// 第一个参数：全局组件的名称，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入mockServe.js --- mock数据
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.css';
Vue.config.productionTip = false

new Vue({

    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    // 注册仓库：组件实例身上会多出一个属性 $store
    store,
    //   注册路由：下面的写法key：value一致，省略value（router小写）
    router,

}).$mount('#app')
