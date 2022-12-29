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
                // 均分
                type: 'category',
            },
            yAxis: {
                // 隐藏y轴
                show: false,
            },
            // 系列
            series: [
                {
                    type: 'bar',
                    data: [10, 7, 33, 88, 20, 45, 30, 50, 98, 67,33,22],
                    color:"skyblue"
                }
            ],
            // 布局调试
            grid: {
                left: 10,
                top: 10,
                right: 10,
                bottom: 10,
            },
            tooltip:{}
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