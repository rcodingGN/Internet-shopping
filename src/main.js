import Vue from 'vue';
import App from './App.vue';
//关闭Vue的生产提示
Vue.config.productionTip = false
// 三级联动组件 -- 全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图 --- 全局组件
import Carousel from '@/components/Carousel';
// 分页器 --- 全局组件
import Pagination from '@/components/Pagination'
// 引入element-ui
import { Button, MessageBox } from "element-ui";
// 第一个参数：全局组件的名称，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
// element-ui 第二种注册组件方法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入mockServe.js --- mock数据
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数  统一引入
import * as API from '@/api/index.js'
new Vue({

    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 注册仓库：组件实例身上会多出一个属性 $store
    store,
    //   注册路由：下面的写法key：value一致，省略value（router小写）
    router,

}).$mount('#app')
