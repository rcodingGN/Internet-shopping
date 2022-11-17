<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
            <!-- <div class="swiper-slide">
                                        <img src="./images/floor-1-b02.png">
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="./images/floor-1-b03.png">
                                    </div> -->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: "ShopCarousel",
    props: ['list'],
    watch: {
        list: {
            immediate: true,
            handler() {
                /**
                 *  立即监听：无论数据有没有发生变化，运行就会监听
                 *  因为Floor中的数据是home给的，父亲给的时候就是一个对象，对象里的数据都是存在的没有发生过变化，所以监听不到
                 *  打印出来两条数据的原因是有两条floor
                //  */
                // console.log("我在监听floor组件");
                this.$nextTick(() => {
                    new Swiper(this.$refs.cur,
                        {
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
                })
            }
        }
    }

}
</script>

<style>
</style>