<template>
    <div>
        <el-card>
            <div slot="header" style="margin:20px 0px">
                <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
            </div>
        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">
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
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataAttr(row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 添加属性|修改属性结构 -->
            <div v-show="!isShowTable">
                <el-form :inline="true" ref="form" label-width="80px">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="icon-el-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
                <el-button @click="isShowTable=true">取消</el-button>
                <el-table border style="width: 100%;margin:20px 0px" :data="attrInfo.attrValueList">
                    <el-table-column align="center" label="序号" width="80" type="index">
                    </el-table-column>
                    <el-table-column align="center" label="属性值名称" width="width">
                        <template slot-scope="{row,$index}">
                            <!-- 这里需要input与span来回切换 -->
                            <!-- 编辑模式 -->
                            <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
                            <!-- 查看模式 -->
                            <span v-else @click="toEdit(row,$index)" style="display:block;">{{row.valueName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <!-- 气泡确认框 -->
                                <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" :title="`确定删除${row.valueName}吗？`" @onconfirm="deleteAttrrValue($index)">
                                    <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                                </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
                <el-button @click="isShowTable=true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: "Attr",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            attrlist: [],
            // 控制表格显示与隐藏
            isShowTable: true,
            // 收集新增|修改属性名
            attrInfo: {
                "attrName": "",  // 属性名
                "attrValueList": [],     // 属性值，属性值可以是多个所以是数组,每一个属性值都是一个对象，需要attrid，valuename 
                "categoryId": 0,       // category3Id
                "categoryLevel": 3,    // 类目等级，因为服务器也需要区分是几级分类id
            },

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
        },
        // 添加属性的回调
        addAttrValue() {
            // 向属性值的数组里面添加元素
            // attrId是相应的属性id，目前是添加属性的操作，没有attrid所以要带给你服务器undefined
            // 数组的变化，Vue可以检测到，所以不需要使用$set
            this.attrInfo.attrValueList.push({
                attrId: this.attrInfo.id,  // 对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值，新增属性值的时候需要带上已有属性的id
                attrName: '',
                // flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处：每一个属性值可以控制自己的模式切换
                // 当前flag是响应式数据（数据变化，视图跟着变化）
                flag: true,
            });
            this.$nextTick(() => {
                this.$refs[this.attrInfo.attrValueList.length - 1].focus();
            })
        },
        // 添加属性按钮的回调
        addAttr() {
            // 切换table的显示与隐藏
            this.isShowTable = false;
            // 清除数据  收集三级分类id
            this.attrInfo = {
                "attrName": "",
                "attrValueList": [],
                "categoryId": this.category3Id,
                "categoryLevel": 3,
            }
        },
        updataAttr(row) {
            this.isShowTable = false;
            // 将选中的属性赋值给attrinfo
            // 由于数据结构存在对象里面套数组，数组里面存在对象，所以需要使用深拷贝
            // 深拷贝与浅拷贝面试频率很高，需要做到手写深浅拷贝
            this.attrInfo = cloneDeep(row);
            // 在修改某一个属性的时候，将相应的属性值元素添加上flag标记
            this.attrInfo.attrValueList.forEach(item => {
                // 下面的写法虽然可以给属性值添加flag自动，但是由于flag不是响应式，所以视图不会变化
                // 因为vue无法探测普通的新增property，下面书写的属性并非响应式属性
                // this.flag = false;
                // 第一个参数：对象，第二个参数：添加新的响应式属性，第三个参数：属性值
                this.$set(item, 'flag', false);
            })
        },
        // 失去焦点的事件 转为span展示
        toLook(row) {
            // 如果属性值为空，不能作为新的属性值，需要提醒用户添加新的属性值
            // row 是用户当前添加的最新的属性值
            // 编辑模式转查看模式
            if (row.valueName.trim() == '') {
                this.$message('输入一个非空值')
                return
            }
            // 新增的属性值不能与已有的属性值重复
            let isRepat = this.attrInfo.attrValueList.some(item => {
                // row是最新新增的属性值，也是数组的最后一个数值，判断的时候需要将自己剔除，不能与自己判断
                // 需要将row从数组里面判断的时候去除
                if (row !== item) {
                    return row.valueName == item.valueName;
                }
            })
            if (isRepat) return;
            row.flag = false;
        },
        // 点击span的回调，变为编辑模式
        toEdit(row, index) {
            row.flag = true;
            // 获取input节点，实现自动聚焦
            // 注意：####  点击span时，切换为input变为编辑模式，但对于浏览器而言，页面的重绘或重排需要时间，因此不可能一点击span立刻获取input
            this.$nextTick(() => {
                // 
                this.$refs[index].focus();
            })
        },
        // 删除属性值的回调 (气泡确认框按钮的回调)
        deleteAttrrValue(){
            // 当前删除属性值的操作不需要发请求
            this.attrInfo.attrValueList.splice(idnex,1)
        },
        // 保存按钮，进行添加|修改属性的操作
       async addOrUpdateAttr(){
            /*
                整理参数
                1、如果用户添加很多属性，属性值为空不能提交给服务器
                2、flag字段不应该提交给服务器
            */
           this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
                // 过滤掉属性值不为空的
                if (item.valueName != '') {
                    // 删除flag属性
                    delete item.flag;
                    return true;
                }
           });
            //    发请求
            try {
                await this.$API.Attr.reqAddOrUpdateAttr(this.attrInfo);
                // 平台属性界面切换
                this.isShowTable = true;
                // 提示信息
                this.$message({type:"success",message:'保存成功'});
                // 保存成功后需要再次获取平台属性进行展示
                this.getAttrList();
            } catch (error) {
                this.$message('保存失败')
            }
        }
    },

}
</script>

<style>
</style>