<template>
    <div style="background: #ccc; height: 50px;">
        <h3>儿子小明: 有存款: {{money}}</h3>
        <button @click="giveMoney">给BABA钱: 50</button>
    </div>
</template>

<script>
import myMixin from './myMixin/myMixin.js'
export default {
    name: 'Son',
    mixins: [myMixin],
    data() {
        return {
            money: 30000
        }
    },

    // methods: {
    //     giveMoney() {
    //         this.money -= 50;
    //         //$parent,VC一个属性,可以获取当前组件(属性|方法)
    //         this.$parent.money += 50;
    //     }
    // }
}
</script>
