const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 存放静态资源文件 js css  img  fonts
  assetsDir: 'assets',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 1996,
    // proxy: {
    //   './api': {
    //     // 目标代理服务器地址
    //       target: 'http://10.192.9.149:1996/',
    //     // 开启代理，本地创建一个虚拟服务器 允许跨域
    //       changeOrigin: true,

    //   }
    // },   
  },
  lintOnSave: false

})
