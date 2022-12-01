<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
        </el-card>
        <el-card>
            <!-- 底部这里将来有三个部分切换 -->
            <div v-show="scene == 0">
                <!-- 展示SPU列表结构 -->
                <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加spu</el-button>
                <el-table style="width: 100%" :data="records">
                    <el-table-column type="index" label="序号" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="spuName" label="SPU名称" width="width">
                    </el-table-column>
                    <el-table-column prop="description" label="SPU描述" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加spu"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
                            <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="text-align:center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handleSizeChange" @current-change="getSpuList">
                </el-pagination>
            </div>
          <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
          <SkuForm v-show="scene == 2"></SkuForm>
           
        </el-card>
    </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
    name: "Spu",
    components:{
        SpuForm,
        SkuForm
    },
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            // 控制三级联动的可操作性
            show: true,
            // 当前第几页
            page:1, 
            // 每一页展示多少条数据
            limit:3,
            // spu列表数据
            records:[],
            // 分页器一共要展示多少条数据
            total:0,
            // 0代表展示SPU列表数据   1代表添加|修改SPU  2 添加SKU
            scene:0,
        }
    },
    methods: {
        // 三级联动的自定义事件，可以把子组件相应的id传递给父组件
        getCategoryId({ categoryId, level }) {
            //   categoryId获取一二三级分类的id，level为了区分是几级id
            if (level == 1) {
                this.category1Id = categoryId;
                this.category2Id = '';
                this.category3Id = '';
            } else if (level == 2) {
                this.category2Id = categoryId;
                this.category3Id = '';
            } else if (level == 3) {
                // 代表三级分类已存在
                this.category3Id = categoryId;
                this.getSpuList();
            }
        },
        // 获取spu列表数据的方法
        async getSpuList(pages = 1) {
            this.page = pages;
            // 携带三个参数：page，category3Id，limit
            const{page,limit,category3Id} = this;
            let result =  await this.$API.Spu.reqSpuList(page,limit,category3Id);
            if (result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        // 点击分页器第几页按钮的回调
        // handleCurrentChange(){
        //     this.page = page;
        //     this.getSpuList();
        // }
        // 当分页器的某一个数据条数发生变化的回调
        handleSizeChange(){
            this.limit = limit;
            this.getSpuList();
       },
    //    添加Spu按钮的回调
       addSpu(){
        this.scene = 1
       },
    //    修改某一个spu
    updateSpu(row){
        this.scene = 1
        // 获取子组件spuform
        this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调（spuform）
    changeScene(scene){
        this.scene = scene;
    }
    }
}
</script>

<style>
</style>