<template>
    <div>
        <!-- 表格 -->
        <el-table style="width:100%" border :data="records">
            <el-table-column type="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
            <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
            <el-table-column label="默认图片" width="110">
                <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px;">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" width="80"></el-table-column>
            <el-table-column prop="price" label="价格" width="80"></el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="success" icon="el-icon-bottom" size="mini" v-if="row.isSale == 0" @click="sale(row)"></el-button>
                    <el-button type="success" icon="el-icon-top" size="mini" v-else @click="cancel(row)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
                    <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="text-align:center;" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getSkuList" @size-change="handleSizeChange">
        </el-pagination>
        <!-- 抽屉效果 -->
        <el-drawer :visible.sync="show" :show-close="false" size:"50%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{skuInfo.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{skuInfo.price}}元</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <template>
                        <el-tag type="success" v-for="(attr,index) in row.skuAttrValueList" :key="attr.id" style="margin: right 5px;">{{attr.attrId}}--{{attr.valueId}}</el-tag>
                    </template>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel height="150px">
                        <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                            <img src="item.imgUrl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: "Sku",
    data() {
        return {
            page: 1,//代表当前第几页
            limit: 3,//代表当前页面有几条数据
            records: [],//存储sku列表的数据
            total: 0,//存储分页器一共展示的数据量
            skuInfo: {},//存储sku详情信息
            show: false,//控制抽屉的显示与隐藏
        }
    },
    mounted() {
        // 获取sku列表的方法
        this.getSkuList();
    },
    methods: {
        // 获取sku列表数据的方法
        async getSkuList(pages = 1) {
            this.page = pages;
            // 解构出默认参数
            const { page, limit } = this;
            let result = await this.$API.Sku.reqSkuList(page, limit)
            if (result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }

        },
        handleSizeChange(limit) {
            // 修改参数
            this.limit = limit;
            this.getSkuList();
        },
        // 上架
        async sale(row) {
            let result = await this.$API.Sku.reqSale(row.id)
            // console.log(result);
            if (result.code == 200) {
                row.isSale = 1;
                this.$message({ type: 'success', message: '上架成功' })
            }
        },
        // 下架
        async cancel(row) {
            let result = await this.$API.Sku.reqCancel(row.id)
            if (result.code == 200) {
                row.isSale = 0;
                this.$message({ type: 'success', message: '下架成功' })
            }
        },
        edit() {
            this.$message('正在开发中')
        },
        // 获取sku详情的方法
        async getSkuInfo(sku) {
            this.show = true;
            let result = await this.$API.Sku.reqSkuById(sku.id)
            if (result.code == 200) {
                this.skuInfo = result.data;
            }
        }
    },
}
</script>

<style scoped>
.el-row .el-col-5 {
    font-size: 18px;
    text-align: right;
}
.el-col {
    margin: 10px 10px;
}
</style>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background-color:red;
    border-radius: 50%;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  </style>