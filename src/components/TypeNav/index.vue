<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <!-- <h1>{{categoryList}}</h1> -->
        <div class="container">
            <!-- 事件的委派 || 事件的委托 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派 + 编程式导航 实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 编程式导航 这样比较麻烦见上面的事件委派 -->
                                    <!-- <a @click="goSearch">{{c1.categoryName}}</a> -->
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- 声明式导航 -->
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <!-- 编程式导航 这样比较麻烦见上面的事件委派 -->
                                                <!-- <a @click="goSearch">{{c2.categoryName}}</a> -->
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                <!-- 声明式导航 -->
                                                <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- 编程式导航 这样比较麻烦见上面的事件委派-->
                                                    <!-- <a @click="goSearch">{{c3.categoryName}}</a> -->
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    <!-- 声明式导航 -->
                                                    <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>

            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">格力超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>

</template>

<script>
import { mapState } from "vuex";
// 引入方式：把整个lodash全部引入
import throttle from "lodash/throttle";

export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true,
        }
    },

    // 组件挂载完毕，可以向服务器发请求，发请求通常是在mounted生命周期函数中进行
    mounted() {
        // 通知Vuex发请求，获取数据并存储在仓库中,
        // 写在这里每次跳转都会重新访问服务器，如果想只访问一次，将this.$store.dispatch('categoryList');放在app.vue中的mounted即可
        // this.$store.dispatch('categoryList');
        /* 
            当组件挂载完毕，让show属性变为false
            如果是不是home路由组件，则让typenav隐藏
         */
        if (this.$route.path != '/home') {
            this.show = false;
        }


    },
    computed: {
        /**
         * 对象右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
         * 注入一个参数state，其实为大仓库中的数据
         */
        ...mapState({
            // categoryList: (state) => {
            //     // console.log(state);
            //     return state.home.categoryList;
            // }
            // 简写形式
            categoryList: state => state.home.categoryList

        })
    },
    methods: {
        // 鼠标进入修改响应式数据currentIndex属性
        // 非节流写法
        // changeIndex(index) {
        //     // index:鼠标移上某一个一级分类的元素索引值
        //     // console.log(index);
        //     /*
        //      * 正常情况（用户缓慢操作）：鼠标进入，每一个一级分类h3都会触发鼠标进入事件
        //      * 非正常情况（用户快速操作）：本应全部一级分类都需要触发事件，但是经过测试，只有部分h3触发
        //      * 因为用户行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，有可能出现卡顿现象
        //      */
        //     this.currentIndex = index;

        // },

        // 节流写法
        // 节流函数不要使用箭头函数
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        /* 鼠标移除 */
        leaveIndex() {
            // 鼠标移出currentIndex为 -1
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        enterShow() {
            if (this.$route.path != '/home') {
                this.show = true;
            }
        },
        goSearch(event) {
            /**
             * 最好的解决办法就是：编程式导航 + 事件委派
             * 事件的委派是将全部子节点的事件委派给父亲节点，如何确定点击的是a标签，如何区分点击的是几级的a标签
             */

            /* 
                第一个问题：把子节点中的a标签，加上自定义属性data-categoryName
                获取到当前触发这个事件的节点有很多，但是需要带有data-categoryName这样的节点
                节点有一个dataset属性，可以或去节点的自定义属性与属性值
             */
            let element = event.target;
            // console.log(element);
            // @@@@@注意：此时的key一定为小写，不然就读取不到数据
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            // console.log('1', categoryname);
            // console.log('2', category1id);
            // console.log('3', category2id);
            // console.log('4', category3id);
            // 如果标签身上拥有categoryName一定是a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname }
                // 一级、二级、三级分类的a标签
                if (category1id) {
                    query.category1id = category1id;
                } else if (category2id) {
                    query.category2id = category2id;
                } else {
                    query.category3id = category3id;
                }
                // 判断：如果路由跳转的时候，带有params参数需要捎带传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    // 整理参数
                    location.query = query;
                    // 路由跳转
                    this.$router.push(location)
                }

            }

        },


    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;
    text-decoration: none;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 515px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                .item:hover {
                    background-color: skyblue;
                }
                .cur {
                    background-color: skyblue;
                }
            }
        }
        // 过渡动画的样式
        // 进入的开始状态（进入）
        .sort-enter {
            height: 0;
        }
        // 过渡动画结束状态（进入）
        .sort-enter-to {
            height: 515px;
        }
        // 定义动画时间，速率
        .sort-enter-active {
            transition: all 0.5s linear;
        }
    }
}
</style>