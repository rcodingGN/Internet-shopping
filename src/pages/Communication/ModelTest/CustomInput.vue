<template>
    <div style="background: #ccc; height: 50px;">
        <h2>input包装组件</h2>
        <!-- ：value是单向数据绑定
            @input绑定原生DOM事件
        -->
        <input type="text" :value="value" @input="$emit('input',$event.target.value)">
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'CustomInput',
    props: ['value']
}
</script>
