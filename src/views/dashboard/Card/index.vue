<template>
    <div>
        <el-row :gutter="10">

            <el-col :span="6">
                <el-card>
                    <!-- 第一个card -->
                    <Detail title="总销售额" count="￥123456">
                        <template slot="charts">
                            <span>
                                周同比&nbsp;&nbsp;56.67%&nbsp;
                                <svg t="1671525648147" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3549" width="20" height="20"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" fill="#d81e06" p-id="3550"></path></svg>
                            </span>
                            &nbsp;&nbsp;
                            <span>
                                日同比&nbsp;&nbsp;16.16%&nbsp;
                                <svg t="1671525694243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6109" width="20" height="20"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="6110"></path></svg>
                            </span>
                        </template>
                        <template slot="footer">
                            <span>日销售额 ￥123456</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- 第二个card -->
                    <Detail title="访问量" count="88460">
                        <template slot="footer">
                        <span>日访问量 1234</span> 
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- 第三个card -->
                    <Detail title="支付笔数" count="88460">
                        <template slot="footer">
                        <span>转换率56%</span> 
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- 第四个card -->
                    <Detail title="运营活动效果" count="78%">
                        <template slot="footer">
                            <span>
                                周同比&nbsp;&nbsp;56.67%&nbsp;
                                <svg t="1671525648147" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3549" width="20" height="20"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" fill="#d81e06" p-id="3550"></path></svg>
                            </span>
                            &nbsp;&nbsp;
                            <span>
                                日同比&nbsp;&nbsp;16.16%&nbsp;
                                <svg t="1671525694243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6109" width="20" height="20"><path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="6110"></path></svg>
                            </span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import Detail from './Detail'
export default {
    name: '',
    components: {
        Detail
    }
}
</script>

<style>
</style>