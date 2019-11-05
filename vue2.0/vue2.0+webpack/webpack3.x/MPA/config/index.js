'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// 这个文件主要是对开发环境和生产环境的一个基本的配置
const path = require('path')

let assetsPublicPath = process.env.staticPath

module.exports = {
  // 开发环境的一个基本配置
  dev: {
    // 编译输出的二级目录
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/', // 本地服务器配置
    // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
    assetsPublicPath: '/dev/web/app/cqj/',
    // 需要使用proxyTable代理的接口(可以跨域)
    proxyTable: {},

    // 开发时候的访问域名。可以通过环境变量自己设置
    host: '192.168.1.149', // can be overwritten by process.env.HOST
    // 开发时候的端口。可以通过环境变量PORT设定。如果端口被占用了，会随机分配一个未被使用的端口
    port: 8081,
    // 是否自动打开浏览器
    autoOpenBrowser: false,
    // 下面两个都是浏览器展示错误的方式
    //  在浏览器是否展示错误蒙层
    errorOverlay: true,
    // 是否展示错误的通知
    notifyOnErrors: true,
    // 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
    // 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
    // vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
    // 或者具体的数值，指定文件查询的具体周期。
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    // 是否使用eslint loader去检查代码
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    // 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现。
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map',
    // source maps的格式
    devtool: '', // 不使用source Maps 加快rebuild速度 遇上问题时使用上面注释的配置

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    // 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
    cacheBusting: true,

    // 关闭css的source map
    cssSourceMap: true,
    // 多页面开发过程中自定义忽略运行的模块
    // ignoreModeles: ['modules/consult_nurse', 'modules/consult_doctor', 'modules/commonPage', 'modules/share_blood_sugar', 'modules/server', 'modules/prd', 'modules/my_prescription', 'modules/personal', 'modules/logistics', 'modules/error', 'modules/blood_sugar', 'modules/detail', 'modules/onDuty']
    ignoreModeles: []
  },

  build: {
    // Template for index.html
    // html文件的生成的地方
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // 编译生成的文件的目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 编译生成的静态文件的目录
    assetsSubDirectory: 'static',
    // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
    assetsPublicPath, // 测试 成产配置

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
    // 是否开启生产环境的gzip压缩
    productionGzip: false,
    // 开启gzip压缩的文件的后缀名称
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
