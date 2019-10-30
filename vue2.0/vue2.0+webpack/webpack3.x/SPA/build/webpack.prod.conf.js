// js严格模式
'use strict'
// 引入path模块
const path = require('path')
// 引入工具方法
const utils = require('./utils')
// 引入webpack模块
const webpack = require('webpack')
// 引入基本的配置
const config = require('../config')
// 引入webpack-merge模块。这个模块用于把多个webpack配置合并成一个配置，后面的配置会覆盖前面的配置。
const merge = require('webpack-merge')
// 引入webpack的基本设置，这个设置文件包含了开发环境和生产环境的一些公共配置
const baseWebpackConfig = require('./webpack.base.conf')
// 拷贝插键
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 用于生成html文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入extract-text-webpack-plugin插件
// 这个插件主要是用于将入口中所有的chunk，移到独立的分离的css文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入optimize-css-assets-webpack-plugin插件
// 这个插件主要是用于压缩css模块的
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 引入uglifyjs-webpack-plugin插件
// 这个插件主要是用于压缩js文件的
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 获取文件
const glob = require('glob')
// 引入用于生产环境的一些基本变量
// const env = require('../config/prod.env')

// 合并公共配置和生产环境独有的配置并返回一个用于生产环境的webpack配置文件
const webpackConfig = merge(baseWebpackConfig, {
  // 用于生产环境的一些loader配置
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      // 在生产环境中使用extract选项，这样就会把thunk中的css代码抽离到一份独立的css文件中去
      extract: true,
      usePostCSS: true
    })
  },
  // 配置生产环境中使用的source map的形式。在这里，生产环境使用的是#source map的形式
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    // build所产生的文件的存放的文件夹地址
    path: config.build.assetsRoot,
    // build之后的文件的名称
    // 这里[name]和[chunkhash]都是占位符
    // 其中[name]指的就是模块的名称
    // [chunkhash]chunk内容的hash字符串，长度为20
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // [id]也是一个占位符，表示的是模块标识符(module identifier)
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new webpack.DefinePlugin({
    //   'process.env': Object.assign(require('../config/prod.env'), {'http_env': JSON.stringify(process.env.http_env)})
    // }),
    new webpack.DefinePlugin({
      'process.env': Object.assign(require('../config/dev.env'), {
        'http_env': JSON.stringify(process.env.http_env),
        // 'http_url': JSON.stringify(process.env.http_url),
        'staticPath': JSON.stringify(process.env.staticPath)
      })
    }),
    // 压缩javascript的插件
    new UglifyJsPlugin({
      // 压缩js的时候的一些基本配置
      uglifyOptions: {
        // 在删除未使用的变量等时，显示警告信息，默认就是false
        compress: {
          warnings: false
        }
      },
      // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
      // 而且这里不能使用cheap-source-map
      sourceMap: config.build.productionSourceMap,
      // 使用多进程并行运行和文件缓存来提高构建速度
      parallel: true
    }),
    // extract css into its own file
    // 提取css文件到一个独立的文件中去
    new ExtractTextPlugin({
      // 提取之后css文件存放的地方
      // 其中[name]和[contenthash]都是占位符
      // [name]就是指模块的名称
      // [contenthash]根据提取文件的内容生成的 hash
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // 从所有额外的 chunk(additional chunk) 提取css内容
      // （默认情况下，它仅从初始chunk(initial chunk) 中提取）
      // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时
      // 这个选项需要设置为true
      allChunks: true
    }),
    // duplicated CSS from different components can be deduped.
    // 使用这个插件压缩css，主要是因为，对于不同组件中相同的css可以剔除一部分
    new OptimizeCSSPlugin({
      // 这个选项的所有配置都会传递给cssProcessor
      // cssProcessor使用这些选项决定压缩的行为
      cssProcessorOptions: config.build.productionSourceMap
      // safe我不是很明白是什么意思？？？求留言告知。。。
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    // webpack2处理过的每一个模块都会使用一个函数进行包裹
    // 这样会带来一个问题：降低浏览器中JS执行效率，这主要是闭包函数降低了JS引擎解析速度。
    // webpack3中，通过下面这个插件就能够将一些有联系的模块，
    // 放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度。
    new webpack.optimize.ModuleConcatenationPlugin(),
    /// 这个插件用于提取多入口chunk的公共模块
    // 通过将公共模块提取出来之后，最终合成的文件能够在最开始的时候加载一次
    // 然后缓存起来供后续使用，这会带来速度上的提升。
    new webpack.optimize.CommonsChunkPlugin({
      // 这是 common chunk 的名称
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        // 把所有从mnode_modules中引入的文件提取到vendor中
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 为了将项目中的第三方依赖代码抽离出来，官方文档上推荐使用这个插件，当我们在项目里实际使用之后，
    // 发现一旦更改了 app.js 内的代码，vendor.js 的 hash 也会改变，那么下次上线时，
    // 用户仍然需要重新下载 vendor.js 与 app.js——这样就失去了缓存的意义了。所以第二次new就是解决这个问题的
    // 参考：https://github.com/DDFE/DDFE-blog/issues/10
    // CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery，vue）的块并将它们分成独立的包。而为什么要new两次这个插件，这是一个很经典的bug的解决方案，在webpack的一个issues有过深
    // 入的讨论webpack/webpack#1315 .----为了将项目中的第三方依赖代码抽离出来，官方文档上推荐使用这个插件，当我们在项目里实际使用之后，发现一旦更改了 app.js 内的代码，vendor.js 的 hash 也 // 会改变，那么下次上线时，用户仍然需要重新下载 vendor.js 与 app.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 如果开启了生产环境的gzip
if (config.build.productionGzip) {
  /* 加载 compression-webpack-plugin 插件 */
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
 /* 向webpackconfig.plugins中加入下方的插件 */
  webpackConfig.plugins.push(
    /* 使用 compression-webpack-plugin 插件进行压缩 */
    new CompressionWebpackPlugin({
      // 目标资源的名称
      // [path]会被替换成原资源路径
      // [query]会被替换成原查询字符串
      // asset: '[path].gz[query]',
      // gzip算法
      // 这个选项可以配置成zlib模块中的各个算法
      // 也可以是(buffer, cb) => cb(buffer)
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      // 只处理比这个值大的资源
      threshold: 10240,
      // 只有压缩率比这个值小的资源才会被处理
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  // 如果需要生成一分bundle报告，则需要使用下面的这个插件
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
