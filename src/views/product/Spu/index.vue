<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
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
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
                            <!-- 注意！！！！这里点击后会报错，学习完成后查找原因 -->
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updataSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)">

                            </hint-button>
                            <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" :title="`确定删除${row.spuName}吗？`" @onconfirm="deleteSpu(row)">
                                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="text-align:center" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handleSizeChange" @current-change="getSpuList">
                </el-pagination>
            </div>
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
            <SkuForm v-show="scene == 2" ref="sku" @changeScenes='changeScenes'></SkuForm>
        </el-card>
        <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
            <!-- table展示sku列表 -->
            <el-table :data="skuList" style="width: 100%;" border v-loading="loading">
                <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
                <el-table-column prop="price" label="价格" width="200"></el-table-column>
                <el-table-column prop="weight" label="重量"></el-table-column>
                <el-table-column label="默认图片">
                    <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" style="width:100px;heigth:100px;">     
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
    name: "Spu",
    components: {
        SpuForm,
        SkuForm
    },
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            // 控制三级联动的可操作性
            // show: true,
            // 当前第几页
            page: 1,
            // 每一页展示多少条数据
            limit: 3,
            // spu列表数据
            records: [],
            // 分页器一共要展示多少条数据
            total: 0,
            // 0代表展示SPU列表数据   1代表添加|修改SPU  2 添加SKU
            scene: 0,
            // 控制对话框的显示与隐藏
            dialogTableVisible: false,
            spu: {},
            // 存储的是sku列表的数据
            skuList: [],
            loading:true
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
            const { page, limit, category3Id } = this;
            let result = await this.$API.Spu.reqSpuList(page, limit, category3Id);
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
        handleSizeChange(limit) {
            this.limit = limit;
            this.getSpuList();
        },
        //    添加Spu按钮的回调
        addSpu() {
            this.scene = 1
            // 通知子组件spuform发请求 -- 两个请求
            // console.log(this.$refs.spu.addSpuData());
            this.$refs.spu.addSpuData(this.category3Id);
        },
        //    修改某一个spu
        updataSpu(row) {
            this.scene = 1
            // 获取子组件spuform
            // console.log(this.$refs);
            this.$refs.spu.initSpuData(row);
        },
        // 自定义事件回调（spuform）
        changeScene({ scene, flag }) {
            // flag这个形参为了区分保存按钮是添加还是修改
            this.scene = scene;
            // 子组件通知父组件切换场景，需要再次获取spu列表的数据进行展示
            this.getSpuList(this.page);
            if (flag == "修改") {
                this.getSpuList(this.page)
            } else {
                this.getSpuList()
            }
        },
        // 删除spu的回调
        async deleteSpu(row) {
            let result = await this.$API.Spu.reqDeleteSpu(row.id);
            if (result.code == 200) {
                this.$message({ type: 'success', message: '删除成功' })
                this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
            }
        },
        // 添加sku按钮的回调
        addSku(row) {
            // console.log(row);
            // 切换场景为2
            this.scene = 2;
            // 父组件调用子组件的方法：让子组件发请求 --- 三个请求
            // 组件中已有category3Id，所以不需要发请求获取
            this.$refs.sku.getData(this.category1Id, this.category2Id, row);
        },
        // skuform通知父组件修改场景
        changeScenes(scene) {
            this.scene = scene;
        },
        // 查看sku属性的对话框
        async handler(spu) {
            // 当点击按钮的时候，dialogTableVisible为真
            this.dialogTableVisible = true;
            // 保存spu信息
            this.spu = spu;
            // 获取sku列表进行展示
            let result = await this.$API.Spu.reqSkuList(spu.id);
            if (result.code == 200) {
                this.skuList = result.data;
                // loading隐藏
                this.loading = false;
            }

        },
        // 关闭对话框的回调
        close(){
            // loading变为true
            this.loading = true;
            // 清除对话框的缓存
            this.skuList=[];
            // 关闭对话框
            done();
        }
    }
}
</script>

<style>
</style>