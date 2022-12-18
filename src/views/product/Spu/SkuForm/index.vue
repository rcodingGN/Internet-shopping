<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SPU名称">
                {{spu.spuName}}
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格（元）" type="number" v-model="skuInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量（千克）" v-model="skuInfo.weight"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="success" row="4" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
                        <!-- 先将attr.id与attrValue.id收集到平台属性中 -->
                        <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                            <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue, index) in attrInfoList" :key="attrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form ref="form" label-width="80px" :inline="true">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
                        <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                            <el-option :label="saleAttrValue.saleAtteValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table border style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange"> 
                    <el-table-column prop="prop" type="selection" width="80px">
                    </el-table-column>
                    <el-table-column prop="prop" label="图片" width="width">
                        <template slot-scope="{row,$index}">
                        <img :src="row.imgUrl" style="width:100px;height:100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                        <el-button type="primary" v-if="row.isDefault==0" @click="changeIsDefault(row)">设置默认</el-button>
                        <el-button v-else>默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            // 存储图片的信息
            spuImageList: [],
            // 存储销售属性
            spuSaleAttrList: [],
            // 获取平台属性
            attrInfoList: [],
            // 收集sku数据字段
            skuInfo: {
                // 第一类收集的数据：父组件给的数据 
                "category3Id": 0,
                "spuId": 0,
                "tmId": 0,
                // 第二类收集的数据：通过数据的双向绑定v-model收集
                "skuName": "",
                "price": 0,
                "weight": "",
                "skuDesc": "",
                // 第三类收集的数据：自己书写代码
                // 默认图片
                "skuDefaultImg": "",
                // 收集图片的字段
                "skuImageList": [
                    // {
                    //     "id": 0,
                    //     "imgName": "string",
                    //     "imgUrl": "string",
                    //     "isDefault": "string",
                    //     "skuId": 0,
                    //     "spuImgId": 0
                    // }
                ],
                // 平台属性
                "skuAttrValueList": [
                    // {
                    //     "attrId": 0,
                    //     "valueId": 0,
                    // }
                ],
                // 收集销售属性
                "skuSaleAttrValueList": [
                    // {
                    //     "id": 0,
                    //     "saleAttrId": 0,
                    //     "saleAttrName": "string",
                    //     "saleAttrValueId": 0,
                    //     "saleAttrValueName": "string",
                    //     "skuId": 0,
                    //     "spuId": 0
                    // }
                ],
            },
            spu:{},
            // 收集图片的数据,收集的数据目前缺少isDefault字段，提交给服务器的时候需要整理参数
            imageList:[],
        }
    },
    methods: {
        // 获取skuform数据
        async getData(category1Id, category2Id, spu) {
            // console.log(spu);
            // 收集父组件给予的数据
            this.skuInfo.category3Id = spu.category3Id;
            this.skuInfo.spuId = spu.id;
            this.skuInfo.tmId = spu.tmId;
            this.spu = spu;
            // 获取图片的数据
            let resultImage = await this.$API.Spu.reqSpuSkuImageList(spu.id)
            //    console.log(result);
            if (resultImage.code == 200) {
                let list = resultImage.data;
                list.forEach(item => {
                    item.isDefault = 0;
                });
                this.spuImageList = list;
            };
            // 获取销售属性的数据
            let resultSale = await this.$API.Spu.reqSpuSaleAttrList(spu.id);
            // console.log(resultSale);
            if (resultSale.code == 200) {
                this.spuSaleAttrList = resultSale.data;
            };
            // 获取平台属性的数据
            let resultAttr = await this.$API.Spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
            // console.log(resultAttr);
            if (resultAttr.code == 200) {
                this.attrInfoList = resultAttr.data;
            }
        },
        // table复选框表格的数据
        handleSelectionChange(params){
            // console.log(params);
            // 获取用户选中图片的信息数据，但要注意，当前收集的数据中缺少isDefault字段，所以在从服务器获取的时候加上
            this.imageList = params;
        },
        // 排它操作
        changeIsDefault(row){
            // console.log(row);
            // 图片列表数据的isDefault字段变为0
            this.spuImageList.forEach(item=>{
                item.isDefault = 0;
            })
            // 点击的那个图片数据的isDefault变为1
            row.isDefault = 1;
            // 收集默认图片地址
            this.skuInfo.skuDefaultImg = row.imgUrl;
        },
        // 取消操作
        cancel(){
            // 自定义事件：让父组件切换场景
            this.$emit('changeScenes',0)
            // 清除数据
            Object.assign(this._data,this.$options.data());
        },
        // 保存按钮的操作
        async save(){
            // 整理参数
            // 整理平台属性
            // 平台属性方法一
            const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this;
            // attrInfoList.forEach(item=>{
            //     // 当前平台属性用户进行选择
            //     if (item.attrIdAndValueId) {
            //         const [attrId,valueId] = item.attrIdAndValueId.split(':');
            //         // 携带给服务器的参数应该是对象
            //         let obj = {attrId,valueId}
            //         arr.push(obj)
            //     }
            // })
            // // 将整理好的参数带给你skuInfo.skuAttrValueList
            // this.skuInfo.skuAttrValueList = arr;

            // 平台属性方法二
           skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
                if (item.attrIdAndValueId) {
                    const [attrId,valueId] = item.attrIdAndValueId.split(':');
                    prev.push({attrId,valueId})
                }
                return prev
            },[])

            // 整理销售属性
           skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
                if (item.attrIdAndValueId) {
                    const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(':')
                    prev.push({saleAttrId,saleAttrValueId})
                }
                return prev
            },[])

            // 整理图片数据
            skuInfo.skuImageList = imageList.map(item=>{
                return {
                    imgName:item.imgName,
                    imgUrl:item.imgUrl,
                    isDefault:item.isDefault,
                    spuImagId:item.id,
                }
            });
            // 发请求
            let result = await this.$API.Spu.reqAddSku(skuInfo);
            // console.log(result);
            if (result.code == 200) {
                this.$message({type:'success',message:'添加sku成功'})
                this.$emit('changeScenes',0)
            }
        }
    },
}
</script>

<style>
</style>