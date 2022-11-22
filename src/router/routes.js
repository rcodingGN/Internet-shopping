// 引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [

    {
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search",
        // 路由组件能不能传递props数据?
        // 布尔值写法:params
        // props: true,
        // 对象写法：额外的给路由组件传递一些props
        // props: { a: 1, b: 2 },
        // 函数写法：可以将params参数、query参数，通过props传递给路由组件
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k };
        // }

    },
    {
        path: "/detail/:skuid?",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/trade",
        name: "trade",
        component: Trade,
        meta: { show: false }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: false }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/center",
        component: Center,
        meta: { show: false },
        children: [
            {
                path: 'myorder',
                component: MyOrder,

            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            },
        ]
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },

    // 重定向，在项目跑起来的时候，访问，立马让他定向到首页
    {
        path: "*",
        redirect: "/home"
    }

]