const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,// 关闭语法检查
    productionSourceMap: false,
    publicPath: './',  // 执行 npm run build 统一配置路径
    // 代理跨域
    devServer: {
        proxy: {
            "/api": {
                // target: "http://39.98.123.211:8510",
                target: "http://gmall-h5-api.atguigu.cn",
                // pathRewrite: { "^/api": "" }
            }
        }
    },
    // 打包体积大报的错
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
            config.mode = 'production';
            config["performance"] = {//打包文件大小配置
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000
            }
        }
    }
})
