<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import*as echarts from 'echarts';

export default {
    name:'lineChart',
    mounted(){
        // 初始化linechart实例
        let lineCharts = echarts.init(this.$refs.charts);
        // 配置数据
        lineCharts.setOption({
            xAxis:{},
            yAxis:{},
            // 系列
            series:[
                {
                    
                }
            ]
        })
    }

}
</script>

<style scoped>
.charts{
    height: 100%;
    width: 100%;
}
</style>