<template>
    <div>
        <el-form ref="form" label-width="80px">
            <!-- SPU名称 -->
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称"></el-input>
            </el-form-item>
            <!-- 品牌 -->
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌">
                    <el-option label="label" value="value"></el-option>
                </el-select>
            </el-form-item>
            <!-- SPU描述 -->
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="描述"></el-input>
            </el-form-item>
            <!-- SPU图片 -->
            <el-form-item label="SPU图片">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <!-- 销售属性 -->
            <el-form-item label="销售属性">
                <el-select placeholder="还有选择" value="">
                    <el-option label="label" value="value"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
                 <el-table border style="width: 100%">
                <el-table-column type="index" label="序号" width="80px" align="center">
                </el-table-column>
                <el-table-column prop="prop" label="属性名" width="width">
                </el-table-column>
                <el-table-column prop="prop" label="属性值名称列表" width="width">
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="width">
                </el-table-column>
            </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="$emit('changeScene',0)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 初始化spuform数据
        // 在父组件中可以通过$refs获取子组件，等等等组件间通信都可以实现
        initSpuData(spu){
            console.log(spu);
        }
    }
}


</script>

<style>
</style>