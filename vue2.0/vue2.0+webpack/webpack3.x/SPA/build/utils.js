// https://segmentfault.com/a/1190000012472099
// js严格模式
'use strict'
// 模块提供用于处理文件路径和目录路径的实用工具
const path = require('path')
// 自己创建的配置，详情看config目录的index.js
const config = require('../config')
// 主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 下面是导入package.json文件,要使用里面的name选项
const packageConfig = require('../package.json')

// 导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory
// 生成编译输出的二级目录
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // path.posix是path模块跨平台的实现（不同平台的路径表示是不一样的）
  return path.posix.join(assetsSubDirectory, _path)
}


// 为不同的css预处理器提供一个统一的生成方式，也就是统一处理各种css类型的打包问题。
// 这个是为在vue文件中的style中使用的css类型
exports.cssLoaders = function (options) {
  options = options || {}

  // 使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法
  // 打包css模块
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 编译postcss模块
  const postcssLoader = {
     // 使用postcss-loader来打包postcss模块
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // 创建loader加载器字符串，结合extract text插件使用
  // @param {loader的名称} loader  
  // @param {loader对应的options配置对象} loaderOptions 
  function generateLoaders (loader, loaderOptions) {
    // 通过usePostCSS 来标明是否使用了postcss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    // 如果指定了具体的loader的名称
    if (loader) {
      // 向loaders的数组中添加该loader对应的加载器
      // 一个很重要的地方就是，一个数组中的loader加载器，是从右向左执行的。
      loaders.push({
        // loader加载器的名称
        loader: loader + '-loader',
        // Object.assign是es6语法的浅复制，后两者合并后复制完成赋值
        // 对应的加载器的配置对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 如果明确指定了需要提取静态文件，则使用
    // ExtractTextPlugin.extract({})来包裹我们的各种css处理器。
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // fallback这个选项我们可以这样理解
        // webpack默认会按照loaders中的加载器从右向左调用编译各种css类型文件。如果一切顺利，在loaders中的
        // 各个加载器运行结束之后就会把css文件导入到规定的文件中去，如果不顺利，则继续使用vue-style-loader来处理
        // css文件
        fallback: 'vue-style-loader'
      })
    } else {
      // 如果没有提取行为，则最后再使用vue-style-loader处理css
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    // css-loader
    css: generateLoaders(),
    // postcss-loader
    postcss: generateLoaders(),
    // less-loader
    less: generateLoaders('less'),
    // sass-loader 后面的选项表明sass使用的是缩进的愈发
    sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss-loader
    scss: generateLoaders('sass'),
    // stylus-loader stylus文件有两种后缀名.stylus和styl
    stylus: generateLoaders('stylus'),
    // stylus-loader
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 使用这个函数，为那些独立的style文件创建加载器配置
exports.styleLoaders = function (options) {
  // 保存加载器配置的变量
  const output = []
  // 获取所有css文件类型的loaders
  const loaders = exports.cssLoaders(options)
  //将各种css,less,sass等综合在一起得出结果输出output
  for (const extension in loaders) {
    const loader = loaders[extension]
    // 生成对应的loader配置
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

  exports.createNotifierCallback = () => {
  //发送跨平台通知系统
  // node-notifier是一个跨平台的包，以类似浏览器的通知的形式展示信息。
  const notifier = require('node-notifier')

  return (severity, errors) => {
    // 只展示错误的信息
    //当报错时输出错误信息的标题，错误信息详情，副标题以及图标
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

     // 需要展示的错误信息的内容 
    notifier.notify({
      // 通知的标题
      title: packageConfig.name,
      // 通知的主体内容
      message: severity + ': ' + error.name,
      // 副标题
      subtitle: filename || '',
      // 通知展示的icon
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
