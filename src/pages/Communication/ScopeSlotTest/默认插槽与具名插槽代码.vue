<template>
  <div>
      <h1>默认插槽</h1>
      <Test>
          <!--填坑的-->
          <template>
              <a href="http://www.baidu.com">百度</a>
          </template>
      </Test>
      <Test>
          <template>
              <div>轮播图的结构</div>
          </template>
      </Test>
      <div>*************************************</div>
      <Test1>
        <!-- 默认插槽 -->
         <template>
             <p style="color:red;">我是填坑的爸爸---默认插槽</p>
         </template>
         <!-- 具名插槽 -->
         <template #fbb>
            <p style="color:cyan;">我是填坑的爸爸---将来具名插槽-fbb</p>
         </template>
         <!-- #fcc其实就是slot='fcc' 简写方式,具名插槽的简写方式 -->
         <template #fcc>
            <p style="color:blue;">我是填坑的爸爸---将来具名插槽---fcc</p>
         </template>
      </Test1>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  import Test from './Test'
  import Test1 from './Test1'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      Test,
      Test1 
    }
  }
</script>
