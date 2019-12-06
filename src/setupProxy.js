const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/UAM", {
        target: "http://192.168.1.170:9090" , //配置你要请求的服务器地址
        changeOrigin: true,
    }))
    // app.use(proxy("/manage/api", {
    //     target: "http://admintest.happymmall.com:7000" ,
    //     changeOrigin: true,
    // }))
};