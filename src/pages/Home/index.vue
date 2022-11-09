<template>
    <div>
        <!-- 三级联动全局组件，已经是全局组件不需要引入 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor />
        <Floor />
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

// import { mapState } from 'vuex';
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
}
</script>

<style>
</style>