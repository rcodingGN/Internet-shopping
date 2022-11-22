<template>
    <div>
        <!-- <h1 v-upper='msg'></h1> -->
        <Header />
        <!-- 路由组件出口的地方 -->
        <router-view></router-view>
        <!-- 在Home、Search显示的、在登录、注册隐藏 -->
        <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'" /> -->
        <!-- 利用路由元信息 meta -->
        <Footer v-show="$route.meta.show" />

    </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
    name: 'App',
    data() {
        return {
            // msg: 'dahjk'
        }
    },
    components: {
        Header,
        Footer
    },
    mounted() {
        // 派发action，获取TypeNav三级列表
        this.$store.dispatch('categoryList');
    },

}
</script>

<style>
</style>