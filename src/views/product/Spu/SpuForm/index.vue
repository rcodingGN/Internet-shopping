<template>
    <div>
        <el-form ref="form" label-width="80px" :model="spu">
            <!-- SPU名称 -->
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <!-- 品牌 -->
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :label="tm.tmName" value="value" v-for="(tm, index) in tradeMarkList" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- SPU描述 -->
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
            </el-form-item>
            <!-- 
                SPU图片 
                上传图片：action图片上传地址
                list-type：文件列表的类型
                on-preview：图片预览的时候会触发
                on-remove：当删除图片的时候会触发
                file-list：照片需要展示的数组，元素包括name与url
                -->
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList" :on-success="handlerSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <!-- 销售属性 -->
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}可以选择`" value="value" v-model="attrIdAndAttrName">
                    <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect, index) in unSelectSaleAttr" :key="unselect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
                <!-- 展示当前spu属于自己的销售属性 -->
                <el-table border style="width: 100%" :data="spu.spuSaleAttrList">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值名称列表" width="width">
                        <!-- 使用作用域插槽、tag标签 -->
                        <template slot-scope="{row,$index}">
                            <!-- el-tag：用户展示已有属性值列表的数据   -->
                            <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @keyup.enter.native="handleInputConfirm(row)" @close="row.spuSaleAttrValueList.splice(index,1)">
                                {{tag.saleAttrValueName}}
                            </el-tag>
                            <!-- 底下的结构可以当作当初span与input切换 -->
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
                            </el-input>
                            <!-- @click="showInput" -->
                            <el-button v-else class="button-new-tag" size="small" @click="addsaleAttrValue(row)">添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancel">取消</el-button>
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
            dialogVisible: false,
            /* 
                spu初始化的时候是一个空对象，
                在修改spu的时候会向服务器发请求，返回spu信息（对象），在修改的时候可以利用服务器返回的对象收集最新的数据提交给服务器
                在添加spu的时候，如果时添加spu的时候并没有向服务器发请求，数据收集到何处，字段有哪些
            */
            spu: {
                // 三级分类id
                "category3Id": 0,
                // 描述
                "description": "",
                // spu名称
                "spuName": "",
                // 平台id
                "tmId": '',
                // 收集spu图片信息
                "spuImageList": [
                    // {
                    //     "id": 0,
                    //     "imgName": "string",
                    //     "imgUrl": "string",
                    //     "spuId": 0
                    // }
                ],
                //    平台属性与属性值的收集 
                "spuSaleAttrList": [
                    // {
                    //     "baseSaleAttrId": 0,
                    //     "id": 0,
                    //     "saleAttrName": "string",
                    //     "spuId": 0,
                    //     "spuSaleAttrValueList": [
                    //         {
                    //             "baseSaleAttrId": 0,
                    //             "id": 0,
                    //             "isChecked": "string",
                    //             "saleAttrName": "string",
                    //             "saleAttrValueName": "string",
                    //             "spuId": 0
                    //         }
                    //     ]
                    // }
                ],

            },// 存储spu信息
            tradeMarkList: [], // 存储品牌信息
            spuImageList: [], // 存储spu图片数据
            saleAttrList: [],// 存储销售属性
            attrIdAndAttrName:'', // 收集未选择的销售属性id ---发请求之前整理好
        };
    },
    methods: {
        // 照片墙删除的回调
        handleRemove(file, fileList) {
            // file参数：代表的是删除了哪张图片
            // fileList参数：代表的是剩余几张图片
            // console.log(file, fileList);
            /* 
                收集照片墙图片的数据
                对于已有的图片（拥有name，url字段），因为照片墙显示数据务必要有这两个属性
                对于服务器而言，上述两条字段多余、不需要，在提交给服务器的时候需要处理
            */
            this.spuImageList = fileList;
        },
        // 照片墙图片预览的回调
        handlePictureCardPreview(file) {
        //   将图片的地址赋值给dialogImageUrl
            this.dialogImageUrl = file.url;
            // 对话框显示
            this.dialogVisible = true;
        },
        // 初始化spuform数据
        // 在父组件中可以通过$refs获取子组件，等等等组件间通信都可以实现
        async initSpuData(spu) {
            // 获取spu信息
            let spuResult = await this.$API.Spu.reqSpu(spu.id);
            // console.log(spuResult);
            if (spuResult.code == 200) {
                // 在修改spu的时候，需要向服务器发请求，把服务器返回的数据（对象），赋值给spu属性
                this.spu = spuResult.data;
            };
            // 获取品牌信息
            let tradeMarkResult = await this.$API.Spu.reqTradeMarkList();
            // console.log(tradeMarkResult);
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data;
            };
            // 获取spu图片数据
            let spuImageResult = await this.$API.Spu.reqSpuImageList(spu.id);
            if (spuImageResult.code == 200) {
                let listArr = spuImageResult.data;
                // 由于照片墙显示图片的数据需要数组，而数组里的元素需要包含name与url字段，所以需要把服务器返回的数据进行修改
                listArr.forEach(item => {
                    item.name = item.imgName;
                    item.url = item.imgUrl;
                });
                // 把整理好的数据赋值给spuimagelist
                this.spuImageList = listArr;
            };
            // 获取平台全部的销售属性
            let saleResult = await this.$API.Spu.reqBaseSaleAttrList();
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data;
            };
        },
        // 照片墙图片上传成功的回调
        handlerSuccess(response,file,fileList){
            // 收集图片信息
            this.spuImageList = fileList;
        },
        // 添加新的销售属性
        addSaleAttr(){
            // 已经收集到的需要添加的属性信息
            // 把收集到销售属性数据进行分割
            const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
            // console.log(baseSaleAttrId,saleAttrName);    
            // 向spusaleattrlist的属性中添加新的销售属性
            let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
            // 添加新的销售属性
            this.spu.spuSaleAttrList.push(newSaleAttr);
            // 清空数组
            this.attrIdAndAttrName = '';
        },
        // 添加属性值的回调
        addsaleAttrValue(row){
            // 点击销售属性值当中添加按钮的时候，需要由button变为input，通过inputVisible控制
            // console.log(row);
            // 挂载在销售属性上的响应式数据inputVisible，控制button与input之间的切换
            this.$set(row,"inputVisible",true)
            // 通过响应式数据inputVisible字段收集新增的销售属性值
            this.$set(row,"inputValue",'')
        },
        // el-input失去焦点事件
        handleInputConfirm(row){
            // console.log(typeof row.spuSaleAttrValueList);
            // 解构出销售属性收集的数据
            const {baseSaleAttrId,inputValue} = row;
              // 新增的销售属性值的名称不能为空
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空');
                return;
            };
            // 新增的属性值不能重复    
            // console.log(row); 
           let result = row.spuSaleAttrValueList.every((item)=>item.saleAttrValueName!=inputValue);
            // console.log(result);  重复的返回false ，不重复的返回true
            if (!result)return
            //  新增的销售属性值
            let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
            // 新增
            row.spuSaleAttrValueList.push(newSaleAttrValue);
            row.inputVisible = false;
           
        },
        // 保存按钮的回调
        async addOrUpdateSpu(){
            // 整理参数：需要整理照片墙的数据
            // 携带参数名称：对于图片：imgName，imgUrl
          this.spu.spuImageList = this.spuImageList.map(item=>{
                return {
                    imageName:item.name,
                    imageUrl:(item.response&&item.response.data)||item.url, 
                }
            });
            // 发请求
            let result = await this.$API.Spu.reqAddOrUpdateSpu(this.spu)
            // console.log(result);
            if (result.code == 200) {
                // 提示
                this.$message({type:'success',message:'保存成功'})
                // 通知父组件回到场景0
                this.$emit('changeScene',{scene:0,flag:this.spu.id?"修改":"添加"})
            }
            // 清除数据
            Object.assign(this._data,this.$options.data());
        },
        // 点击添加spu按钮的回调
        async addSpuData(category3Id){
            // 添加spu的时候收集三级分类的id
            this.spu.category3Id = category3Id;
            // 获取品牌信息
            let tradeMarkResult = await this.$API.Spu.reqTradeMarkList();
            // console.log(tradeMarkResult);
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data;
            };
            // 获取平台全部的销售属性
            let saleResult = await this.$API.Spu.reqBaseSaleAttrList();
            // console.log('2222',saleResult);
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data;
            };
        },
        // 取消函数的回调
        cancel(){
            // 取消按钮的回调，通知父亲切换场景为0
            this.$emit('changeScene',{scene:0,flag:''})
            // 清理数据
            // Object.assign es6中新增的方法可以合并对象
            // 组件实例this._data,可以操作data当中响应式数据
            // this.$options 可以获取配置对象，配置对象的data函数执行返回的响应式数据为空
            Object.assign(this._data,this.$options.data());
        }

    },
    computed: {
        // 计算出还未选择的属性, 当未选择的属性被选择后应该减少对应的属性
        unSelectSaleAttr(){
            // 整个平台有三个销售属性  --- saleAttrList
            // 当前spu拥有的销售属性 --- spuSaleAttrList
            // 数组的过滤方法：可以从已有的数组当中过滤出用户需要的元素，并返回一个新数组
            let result = this.saleAttrList.filter(item=>{
                // every数组的方法，会返回一个布尔值
                return this.spu.spuSaleAttrList.every(item1=>{
                    return item.name != item1.saleAttrName
                })
            })
            return result
        }
    },
}
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>