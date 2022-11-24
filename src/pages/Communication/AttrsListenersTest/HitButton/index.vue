<template>
    <a :title="tip">
        <!-- 下面的写法不能使用v-bind的简写 ：   v-on也不能使用@替换 -->
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>

</template>

<script>
export default {
    name: '',
    props: ['tip'],
    mounted() {
        // 属于组件中一个属性，可以获取到父组件传递过来的props数据
        // 对于子组件而言，父组件给的数据可以通过props获取，但是子组件通过props获取的属性，在$attrs中无法获取 
        // $attrs 展示的是样式
        console.log("1123", this.$attrs);
        // $listeners，组件实例自身的一个属性，可以获取到父组件给子组件传递自定义事件
        // $listeners 展示是绑定的方法
        console.log(this.$listeners);
    },
}
</script>

<style>
</style>