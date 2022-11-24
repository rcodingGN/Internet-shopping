<template>
    <div>
        小明的爸爸现在有{{money}}元
        <h2>不使用sync修改符</h2>
        <!-- 给子组件绑定一个自定义事件:update:money
        ：money 父组件给子组件传递props
        这种操作与v-model类似，可以实现父子组件数据同步
     -->
        <Child :money="money" @update:money="handler"></Child>
        <h2>使用sync修改符</h2>
        <!-- 
            ：money.sync 两层含义
            1、父组件给子组件传递props
            2、给当前子组件绑定了一个自定义事件，而且事件名称为update：money
         -->
        <Child2 :money.sync="money"></Child2>
        <hr>
    </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
    name: 'SyncTest',
    components: {
        Child,
        Child2
    },
    data() {
        return {
            money: 10000
        }
    },
    methods: {
        handler(money) {
            this.money = money;
        }
    }
}
</script>
