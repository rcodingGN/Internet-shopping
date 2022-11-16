<template>
  <div class="pagination">
    <button v-show="pageNo > 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- :disabled="pageNo==1" 是让在第一页时上一页不可点击 -->
    <!-- 上 -->
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo == page}"
    >
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo == totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
      >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <h1>{{startNumAndEndNum}}---{{pageNo}}</h1> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  // 计算属性
  computed: {
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的起始数字与结束数字(连续的页码数字至少是 5 )
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      // 如果出现页码不够五页的情况
      if (continues > totalPage) {
        // 连续页码为 5 ，总页数小于5
        start = 1;
        end = totalPage;
      } else {
        // 连续页码为 5 ，总页数大于5
        // 起始数字
        start = pageNo - parseInt(continues / 2);
        // 结束数字
        end = pageNo + parseInt(continues / 2);
        // 将出现的异常情况纠正（起始页数为负或0）
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //将出现的异常情况纠正（结束页数超过totalPage）
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

</style>