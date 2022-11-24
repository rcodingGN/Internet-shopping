export default {
    methods: {
        giveMoney() {
            this.money -= 100;
            this.$parent.money += 100;
        }
    }
}