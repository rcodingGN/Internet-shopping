<template>
    <div>
        <!-- 三级联动全局组件，已经是全局组件不需要引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <!-- Floor组件在内部是没有发送请求的，数据是父组件给的 mounted下的this.$store.dispacth 与 computed下的...mapstate -->
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
        <!-- <Floor /> -->
        <Brand />

    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import { mapState } from 'vuex';
export default {
    name: 'ShopHome',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        // 派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList');
        // 获取用户信息在首页展示
        // this.$store.dispatch('getUserInfo');
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList,
        })
    }
}
</script>

<style>
</style>