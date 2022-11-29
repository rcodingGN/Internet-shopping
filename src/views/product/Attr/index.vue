<template>
    <div>
        <el-card>
            <div slot="header" style="margin:20px 0px">
                <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
            </div>
        </el-card>
        <el-card>
            <el-button type="primary" icon="el-icon-plus">
                添加属性
            </el-button>
            <!-- 表格：平台属性 -->
            <el-table style="width: 100%" border :data="attrlist">
                <el-table-column type="index" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="attrName" label="属性名称" width="200">
                </el-table-column>
                <el-table-column prop="prop" label="属性值列表" width="width">
                    <template slot-scope="{row,index}">
                        <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id" style="margin:0px 20px">{{attrValue.valueName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="200">
                    <template slot-scope="{row,index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                            
                        
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Attr",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            attrlist: [],
        }
    },
    methods: {
        // 自定义事件回调
        getCategoryId({ categoryId, level }) {
            // 区分三级分类相应的id以及对父组件进行存储
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
                this.getAttrList();
            }
        },
        // 获取平台属性的数据
        // 当用户确定三级分类数据的时候，可以向服务器发请求获取平台属性进行展示
        async getAttrList() {
            // 获取分类id
            const { category1Id, category2Id, category3Id } = this;
            let result = await this.$API.Attr.reqAttrList(category1Id, category2Id, category3Id);
            // console.log(result);
            if (result.code == 200) {
                this.attrlist = result.data;
            }
        }
    },

}
</script>

<style>
</style>