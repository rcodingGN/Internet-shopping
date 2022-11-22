// Vue插件一定是暴露一个对象

let myPlugins = {}

myPlugins.install = function (Vue, options) {
    // 任何组件都可以使用
    // Vue,prototype.$bus ... 
    Vue.directive(options.name, (element, params) => {
        console.log('执行');
        element.innerHTML = params.value.toUpperCase();
        console.log(params);
    })
    console.log('调用');
    console.log(options);
}

export default myPlugins;