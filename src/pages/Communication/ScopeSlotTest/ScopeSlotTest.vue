<template>
  <div>
    <h1>作用域插槽</h1>
    <List :todos="todos">
         <template v-slot="{todo,}">
             <h1 :style="{color:todo.isComplete?'red':'cyan'}">{{todo.text}}</h1>
         </template>
    </List>
    <hr>
    <h1>********************************************************************************************</h1>
    <List1 :todos="todos">
        <template v-slot="{todo,$index}">
             <h1 :style="{color:todo.isComplete?'red':'cyan'}">{{todo.text}}----{{$index}}</h1>
         </template>

    </List1>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  import List1 from './List1'
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
      List1
    }
  }
</script>
