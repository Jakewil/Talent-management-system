module.exports = {
    runtimeCompiler: true,
    publicPath: '/', // 设置打包文件相对路径
    devServer: {
        // open: process.platform === 'darwin',
        // host: 'localhost',
        port: 8080,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                // target: 'http://zhangh.nat300.top/', //对应自己的接口
                target:'http://192.168.43.43:8001/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}
