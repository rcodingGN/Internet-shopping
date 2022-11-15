<template>
    <!--列表-->
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <ShopCarousel :list="bannerList" />
                <!-- <div class="swiper-container" ref="mySwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(carousel,index) in bannerList" :key="carousel.id">
                            <img :src="carousel.imgUrl" />
                        </div> -->
                <!-- <div class="swiper-slide">
                            <img src="./images/banner2.jpg" />
                        </div> 
                        <div class="swiper-slide">
                            <img src="./images/banner3.jpg" />
                        </div>
                        <div class="swiper-slide">
                            <img src="./images/banner4.jpg" /> -->
                <!-- </div> -->
                <!-- </div> -->
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div> -->
            </div>
            <div class="right">
                <div class="news">
                    <h4>
                        <em class="fl">尚品汇快报</em>
                        <span class="fr tip">更多 ></span>
                    </h4>
                    <div class="clearix"></div>
                    <ul class="news-list unstyled">
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[公告]</span>备战开学季 全民半价购数码
                        </li>
                        <li>
                            <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                        </li>
                    </ul>
                </div>
                <ul class="lifeservices">
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">话费</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">机票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">电影票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">游戏</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">彩票</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">加油站</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">酒店</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">火车票</span>
                    </li>
                    <li class=" life-item ">
                        <i class="list-item"></i>
                        <span class="service-intro">众筹</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">理财</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">礼品卡</span>
                    </li>
                    <li class=" life-item">
                        <i class="list-item"></i>
                        <span class="service-intro">白条</span>
                    </li>
                </ul>
                <div class="ads">
                    <img src="./images/ad1.png" />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from "vuex";
// 引入swiper包，在main.js中引入
// import Swiper from 'swiper';
export default {
    name: 'ShopListContainer',
    props: ['list'],
    data() {
        return {

        }
    },
    mounted() {
        // 派发action：通过Vuex发起ajax请求，将数据存储在仓库中
        // console.log("组件的mounted");
        this.$store.dispatch('getBannerList');
        //  在new swiper实例之前，页面中结构必须存在，但是在下面new swiper实例发现不行
        // 因为dispatch当中涉及到异步语句，导致v-for遍历的时候结构还没有完全加载，所以不行


        /*  这个方法也可以用于轮播图，但是并不完美
        setTimeout(() => {
        console.log("初始化swiper实例");
        var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            // 点击小球的时候也会切换图片
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }
                    })
                },200) */

    },
    computed: {
        ...mapState({
            // bannerList: state => state.home.bannerList

            bannerList: (state) => {
                // console.log(state);
                return state.home.bannerList
            },
        })
    },
    // watch: {
    //     // 监听bannerList数据的变化，因为这条数据发生过变化 --- 有空数组变为具有四个元素的数组

    //     bannerList: {
    //         handler() {
    //             // 通过watch监听bannerList属性的属性值变化  如果执行handler方法，代表组件实例身上属性的属性值已有（数组：四个元素）
    //             // 下面的函数执行，只能保证bannerList数据存在，但是无法保证v-for执行结束；但v-for执行完毕才会拥有结构（watch无法保证执行结束）
    //             // nextTick：在下次DOM更新，循环结束之后，执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的DOM。
    //             this.$nextTick(() => {
    //                 // 当执行这个回调的时候：保证服务器数据收到，v-for执行完毕（轮播图的结构已存在）
    //                 var mySwiper = new Swiper(this.$refs.mySwiper,
    //                     {
    //                         loop: true,
    //                         // 如果需要分页器
    //                         pagination: {
    //                             el: ".swiper-pagination",
    //                             // 点击小球的时候也会切换图片
    //                             clickable: true,
    //                         },
    //                         // 如果需要前进后退按钮
    //                         navigation: {
    //                             nextEl: ".swiper-button-next",
    //                             prevEl: ".swiper-button-prev",
    //                         }
    //                     })
    //             })

    //         }
    //     }
    // }
}
</script>
<style lang="less" scoped>
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 515px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(./images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>