const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy("/api", {
        target: "http://192.168.1.106:8081", //配置你要请求的服务器地址
        changeOrigin: true,
    }))
    app.use(proxy("/web", {
        target: "http://192.168.1.106:8081",
        changeOrigin: true,
    }))
    // app.use(proxy("/api", {
    //     target: "http://58.16.67.132:8884", //配置你要请求的服务器地址
    //     changeOrigin: true,
    // }))
    // app.use(proxy("/web", {
    //     target: "http://58.16.67.132:8884",
    //     changeOrigin: true,
    // }))
    app.use(proxy("/uam-manager_img", {
        target: "http://uam-s.oss.gzdata.com.cn",
        changeOrigin: true,
    }))
};

