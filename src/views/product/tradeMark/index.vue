<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 
    data：将要展示的数据 -- 数组类型
    border：表格边框
    label：显示标题
    width：对应列的宽度
    align：标题的对齐方式
    prop：对应列内容的字段名，也可以使用 property 属性
    注意：elementui当中table组件，展示的数据是以一列一列进行展示数据
  -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="row" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
        
        @size-change="handleSizeChange" 每一页展示的数据数量
        @current-change="handleCurrentChange"   跳转到哪一页

        curren-page：代表当前第几页
        total：代表分页器一共需要展示多少数据
        page-size：代表的是每一页需要展示多少数据
        page-sizes：代表可以设置每一页展示多少数据
        layout：可以实现分页器的布局
        pager-count：页码按钮的数量，当总页数超过该值时会折叠
    -->
    <el-pagination
      style="magin-top: 20px; textAlign: center"
      :current-page="page"
      :total="total"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :pager-count="9"
      layout=" prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 
        对话框 
        :visible.sync:控制对话框显示与隐藏
        
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
        -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- 
        form表单元素
        model属性：把表单的数据收到对象身上，将来也需要用于表单验证
       -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" label-width="100px" prop="logoUrl">
            <!-- 
                图片上传
                :on-success="handleAvatarSuccess"  可以检测到图片上传成功，成功后会执行一次
                :before-upload="beforeAvatarUpload" 在上传图片之前执行一次
                action：设置图片上传的地址
             -->
             <!-- 这里收集数据不可以使用v-model，因为不是表单元素 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    var validateTmName = (rule, value, callback) => {
        // 自定义检验规则
        if (value.lenght<2|value.lenght>11) {
            callback(new Error('品牌的名称需要2-10'))
        }else{
            callback()
        }
      };
    return {
      // 当前分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 数据总数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏的控制属性
      dialogFormVisible: false,
        // 上传图片
        imageUrl: '',
        // 收集品牌信息
        tmForm:{
            tmName:'',
            logoUrl:''
        },
        // 表单验证
         rules: {
            // 品牌名称的验证规则
          tmName: [
            // trigger 用户行为（blur、change）  required 必填项  message 提示信息
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            // min，max文本长度上下限
            // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            // 自定义检验规则
            { validator: validateTmName, trigger: 'change' }
          ],
        //   品牌logo验证规则
          logoUrl: [
            { required: true, message: '请选择品牌图片' }
          ],
         
        }

    };
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    async getPageList(pager=1) {
      this.page = pager;
      // 解构参数
      const { page, limit } = this;
      // 获取品牌列表接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);   
      if (result.code == 200) {
        // 分别是数据总数与列表数组
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 加入到getpagelist中
    // handleCurrentChange(pager){
    //     // console.log(pager);
    //     // 修改参数
    //     this.page = pager;
    //     this.getPageList();
    // }
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      // console.log(limit);
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
    //   清除数据
    this.tmForm = {tmName:'',logoUrl:''}
    },
    // 修改某个品牌
    updateTradeMark(row) {
        // row:当前用户选中的品牌信息
      this.dialogFormVisible = true;
    //   将已有的品牌信息赋值给tmForm
    // 将服务器返回的品牌信息直接赋值给tmForm进行展示，tmform存储的就是服务器返回的信息
    // console.log(row);
      this.tmForm = {...row};

    },
    // 上传图片相关的回调
    // 图片上传成功
    handleAvatarSuccess(res, file) {
        // res：上传成功后返回前端数据，照片为服务器地址
        // file：上传成功后服务器返回前端数据
        // 收集品牌数据，因为将来需要带给服务器
        // console.log(file);
        this.tmForm.logoUrl = res.data;
      },
    //   图片上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //   添加按钮（添加品牌|修改品牌）
      addOrUpdateTradeMark(){
        // 当全部验证字段通过，才能书写业务逻辑
        this.$refs.ruleForm.validate( async (success) => {
        
          if (success) {
           this.dialogFormVisible = false;
          // 发请求（添加品牌|修改品牌）
          let result = await this.$API.trademark.reqAddUpdateTradeMark(this.tmForm);
          // console.log(result);
          if (result.code == 200) {
            // 弹出信息：添加品牌成功、修改品牌成功
            this.$message({
                type:'success',
                message:this.tmForm.id?'修改品牌成功':'添加品牌成功'
                })
            // 添加或修改品牌成功后，需要再次获取品牌列表进行展示
            // 如果是添加品牌，应该停留在第一页，修改品牌应该停留在当前页
            this.getPageList(this.tmForm.id?this.page:1);
        }
          } else {
            console.log('error submit!!');
            return false;
          }
        });


        
      },
    //   删除品牌信息
    deleteTradeMark(row){
        // 弹框
        this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        // 当用户点击确定按钮的时候触发
        let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
       if (result.code == 200) {
        // 如果删除成功
       this.$message({
            type: 'success',
            message: '删除成功!'
          });
        //   再次获取列表
        this.getPageList(this.list.length>1?this.page:this.page-1);
       }
          
        }).catch(() => {
            // 当用户点击确定按钮的时候触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
