<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
        </el-card>
        <el-card>
            <!-- 底部这里将来有三个部分切换 -->
            <div>
                <!-- 展示SPU列表结构 -->
                <el-button type="primary" icon="el-icon-plus">添加spu</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
export default {
    name: "Spu",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            // 控制三级联动的可操作性
            show:true,
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
        getSpuList(){
            
        }
    }
}
</script>

<style>
</style>