<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SKU名称">
                123
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="sku名称"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格（元）"></el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量（千克）"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="success" row="4"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item label="屏幕尺寸">
                        <el-select placeholder="请选择">
                            <el-option label="label" value="value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="无线通信">
                        <el-select placeholder="请选择">
                            <el-option label="label" value="value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item label="颜色">
                        <el-select placeholder="请选择">
                            <el-option label="label" value="value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table border style="width: 100%">
                    <el-table-column prop="prop" label="label" type="selection" width="80px">
                    </el-table-column>
                    <el-table-column prop="prop" label="图片" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="名称" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm'
}
</script>

<style>
</style>