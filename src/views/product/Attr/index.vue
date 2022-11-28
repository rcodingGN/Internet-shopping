<template>
    <div>
        <el-card>
            <div slot="header" style="margin:20px 0px">
                <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
            </div>
            <div></div>
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
        }
    },
    methods: {
        // 自定义事件回调
        getCategoryId({ categoryId, level }) {
            // 区分三级分类相应的id以及对父组件进行存储
            if (level == 1) {
                this.category1Id = categoryId;
                this.category2Id='';
                this.category3Id='';
            } else if (level == 2) {
                this.category2Id = categoryId;
                this.category3Id='';
            } else if (level == 3) {
                // 代表三级分类已存在
                this.category3Id = categoryId;
                this.getAttrList();
            }
        },
        // 获取平台属性的数据
        getAttrList(){

        }
    },

}
</script>

<style>
</style>