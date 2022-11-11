<template>
    <!--楼层-->
    <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{list.name}}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="(nav,index) in list.navList" :key="index">
                            <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for="(keyword,index) in list.keyword" :key="keyword.id">{{keyword}}</li>
                            </ul>
                            <img :src="list.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <ShopCarousel :list="list.carouselList" />
                            <!-- 以下原本是轮播图 但是要做轮播图的全局组件，所以代码被复制到carouse组件中 -->
                            <!-- <div class="swiper-container" id="floor1Swiper" ref="cur">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(carousel,index) in list.carouselList" :key="carousel.id">
                                        <img :src="carousel.imgUrl">
                                    </div> -->
                            <!-- <div class="swiper-slide">
                                        <img src="./images/floor-1-b02.png">
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="./images/floor-1-b03.png">
                                    </div> -->
                            <!-- </div>  -->
                            <!-- 如果需要分页器 -->
                            <!-- <div class="swiper-pagination"></div> -->

                            <!-- 如果需要导航按钮 -->
                            <!-- <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div> -->
                            <!-- </div> -->
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[0]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[1]" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="list.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[2]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import Swiper from 'swiper';
export default {
    name: 'ShopFloor',
    props: ['list'],
    mounted() {
        /** 
         * 
         *  listcontainer放在mounted没有反应，但是现在就可以了，原因是什么？ 
         *      第一次书写轮播图的时候是在当前组件内部发送请求，动态渲染结构（前提至少服务器数据需要返回，因此当年的写法错误）
         *      现在写法正确的原因：因为请求是父组件发的，父组件通过props传递过来，结构已经存在的情况下执行mounted
         * 
         *       下面的写法正确，但是为了封装轮播图的全局组件，所以需要注释掉，与watch中的方法一致
         * */
        // var mySwiper = new Swiper(this.$refs.cur,
        //     {
        //         loop: true,
        //         // 如果需要分页器
        //         pagination: {
        //             el: ".swiper-pagination",
        //             // 点击小球的时候也会切换图片
        //             clickable: true,
        //         },
        //         // 如果需要前进后退按钮
        //         navigation: {
        //             nextEl: ".swiper-button-next",
        //             prevEl: ".swiper-button-prev",
        //         }
        //     })
    },
    // watch: {
    //     list: {
    //         immediate: true,
    //         handler() {
    //             /**
    //              *  立即监听：无论数据有没有发生变化，运行就会监听
    //              *  因为Floor中的数据是home给的，父亲给的时候就是一个对象，对象里的数据都是存在的没有发生过变化，所以监听不到
    //              *  打印出来两条数据的原因是有两条floor
    //             //  */
    //             // console.log("我在监听floor组件");
    //             this.$nextTick(() => {
    //                 var mySwiper = new Swiper(this.$refs.cur,
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

<style scoped lang="less">
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #e1251b;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>