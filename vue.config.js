const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,// 关闭语法检查
    // 代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://39.98.123.211:8510",
                // target: "http://gmall-h5-api.atguigu.cn",
                // pathRewrite: { "^/api": "" }
            }
        }
    }
})
