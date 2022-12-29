<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import *as echarts from 'echarts';

export default {
    name: 'lineChart',
    mounted() {
        // 初始化linechart实例
        let lineCharts = echarts.init(this.$refs.charts);
        // 配置数据
        lineCharts.setOption({
            xAxis: {
                // 隐藏x轴
                show: false,
                type: 'category',
            },
            yAxis: {
                // 隐藏y轴
                show: false,
            },
            // 系列
            series: [
                {
                    type: 'line',
                    data: [10, 7, 33, 88, 20, 45, 30, 50, 98, 67],
                    // 设置拐点样式
                    itemStyle: {
                        opacity: 0
                    },
                    // 线条的样式
                    lineStyle: {
                        color: 'purple'
                    },
                    // 填充颜色
                    areaStyle: {
                        color: {
                            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'purple' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                    },
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