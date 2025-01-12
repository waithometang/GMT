'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let proxy='http://192.168.0.120:8000/gmtapi'
// let proxy='http://gmt.gaoming.gov.cn'
module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            "/plcj/Plcj/*": {
                target: proxy,
                changeOrigin: true
            },
            "/api/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/fapi/": {
              target: proxy,
              changeOrigin: true
            },
            "/cwwj/": {
              target: proxy,
              changeOrigin: true
            },
            "/gmt/*": { //图片文件
              target: proxy,
              changeOrigin: true
            },
            "/UploadFile/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/ybm/api/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/static/*": { //需要代理的路径
              target: 'http://gmt.gaoming.gov.cn',
              changeOrigin: true
            },
            "/pics/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/gmt/FiWebEditor/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/images/*": { //需要代理的路径
              target: 'http://gmt.gaoming.gov.cn',
              changeOrigin: true
            },
            "/files/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            },
            "/mbpics/*": { //需要代理的路径
              target: proxy,
              changeOrigin: true
            }
        },

        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
