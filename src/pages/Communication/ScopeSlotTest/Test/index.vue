<template>
  <div>
       <pre>学习-默认插槽</pre>
       <h1>我喜欢张杰的歌曲</h1>
       <!--
            slot,本身即为插槽，slot是一个全局组件、默认插槽
            底下相当于子组件留了一个'大坑'
        -->
       <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style scoped>

</style>
