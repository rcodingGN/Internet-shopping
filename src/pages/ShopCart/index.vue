<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <!-- <div class="cart-th3">属性</div> -->
                <div class="cart-th4">单价（元）</div>
                <div class="cart-th5">数量</div>
                <div class="cart-th6">小计（元）</div>
                <div class="cart-th7">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart,$event)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl">
                        <div class="item-msg">{{cart.skuName}}</div>
                    </li>
                    <!-- <li class="cart-list-con3">
                        <div class="item-txt">语音升级款</div>
                    </li> -->
                    <li class="cart-list-con4">
                        <span class="price">{{cart.skuPrice}}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
                        <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value,cart)">
                        <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0" @change="updateAllCartChecked">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>0</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
                    <!-- <router-link class="sum-btn" to="/trade">结算</router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入方式：把整个lodash全部引入
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

export default {
    name: 'ShopCart',
    mounted() {
        this.getData();
    },
    methods: {
        // 获取个人购物车数据
        getData() {
            this.$store.dispatch('getCartList')
        },
        // 节流写法
        // 节流函数不要使用箭头函数
        // 修改某一个产品的个数
        handler: throttle(async function (type, disNum, cart) {
            /* 
                type:区分三个元素
                disNum：元素变化的量
                cart：产品的id
            */
            console.log("派发action", type, disNum, cart);
            switch (type) {
                case "add":
                    // 带给服务器变化量
                    disNum = 1;
                    break;
                case "minus":
                    // 判断产品的个数大于1，才可以给服务器传
                    // if (cart.disNum > 1) {
                    //     disNum = -1;
                    // }else{
                    //     // 产品的个数小于等于1
                    //     disNum = 0;
                    // }
                    // 下方简写
                    disNum = cart.skuNum > 1 ? -1 : 0;
                    break;
                case "change":
                    // 用户输入为非法字符||数字，给服务器传0
                    // if (isNaN(disNum) || disNum < 1) {
                    //     disNum = 0;
                    // } else {
                    //     // 出现大于1的小数
                    //     disNum = parseInt(disNum) - cart.skuNum;
                    // }
                    // 下方为简写
                    disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum;

            }
            // 派发action
            try {
                await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum });
                // 再一次获取服务器数据进行展示  
                this.getData();
            } catch (error) {
                switch (type) {
                    case "add":
                        alert("添加失败");
                        break;
                    case "minus":
                        alert("减少失败");
                        break;
                    case "change":
                        alert("更改失败");
                        break;
                }
            }
        }, 500),
        // 删除某个产品的操作
        async deleteCartById(cart) {
            try {
                await this.$store.dispatch('deleteCartById', cart.skuId);
                this.getData();
            } catch (error) {
                alert(error.message)
            }
        },
        // 修改某一个产品的勾选状态
        async updateChecked(cart, $event) {
            let checked = $event.target.checked ? 1 : 0;
            try {
                await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked: checked })
                // 如果修改数据成功，再次获取服务器数据
                this.getData();
            } catch (error) {
                alert(error.message)
            }
        },
        // 删除所有选中的产品
        async deleteAllCheckedCart() {
            try {
                // 派发action
                await this.$store.dispatch('deleteAllCheckedCart')
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },
        updateAllCartChecked: debounce(async function (event) {
            try {
                // 给字符串的原因是，接口要的是string属性
                let isChecked = event.target.checked ? "1" : "0";
                // 派发action
                await this.$store.dispatch('updateAllCartIsChecked', isChecked);
                this.getData();
            } catch (error) {
                alert(error.message)
            }
        }, 50)

    },
    computed: {
        ...mapGetters(['cartList']),
        cartInfoList() {
            return this.cartList.cartInfoList || [];
        },
        // 计算购买产品的总价
        totalPrice() {
            let sum = 0;
            this.cartInfoList.forEach(item => {
                sum += item.skuNum * item.skuPrice;
            });
            return sum;
        },
        // 判断底部复选框是否勾选
        isAllCheck() {
            // 遍历数组里的元素，只要全部元素isChecked属性都为1，返回为true。 只要有一个不是1，就会返回false
            return this.cartInfoList.every(item => item.isChecked == 1)
        }

    },
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            // .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                // .cart-list-con3 {
                //     width: 10%;

                //     .item-txt {
                //         text-align: center;
                //     }
                // }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>