<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import *as echarts from 'echarts';

export default {
    name: 'barChart',
    mounted() {
        // 初始化linechart实例
        let barCharts = echarts.init(this.$refs.charts);
        // 配置数据
        barCharts.setOption({
            xAxis: {
                // 隐藏x轴
                show: false,
                // 最小值与最大值的设置
                min:0,
                max:100,
                
            },
            yAxis: {
                // 隐藏y轴
                show: false,
                type: 'category',

            },
            // 系列
            series: [
                {
                    type: 'bar',
                    data: [78],
                    color:"skyblue",
                    // 柱状图的宽度
                    barWidth:10,
                    color:'yellowgreen',
                    // 背景颜色设置
                    showBackground:true,
                    // 设置背景颜色
                    backgroundStyle:{
                        color:'#eee'
                    },
                    // 文本标签
                    label:{
                        show:true,
                        // 改变文本内容
                        formatter:'|',
                        // 内容定位
                        position:'right'
                    }
                }
            ],
            // 布局调试
            grid: {
                left: 10,
                top: 10,
                right: 10,
                bottom: 10,
            },
        })
    }

}
</script>

<style scoped>
.charts {
    height: 100%;
    width: 100%;
}
</style>