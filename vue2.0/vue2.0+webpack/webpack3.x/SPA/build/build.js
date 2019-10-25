// js严格模式
'use strict'
// 检查node 和npm  版本 ，细节看下文
require('./check-versions')()
// 全局定义字段，production表示生产环境，通过判断process.env.NODE_ENV是不是production来判断是不是生产环境
process.env.NODE_ENV = 'production'

// 部署时候加载转圈圈，https://www.npmjs.com/package/ora
const ora = require('ora')
// 删除文件， https://www.npmjs.com/package/rimraf
const rm = require('rimraf')
// 模块提供用于处理文件路径和目录路径的实用工具
const path = require('path')
// 修改输出颜色, http://nodejs.cn/api/path.html
const chalk = require('chalk')
const webpack = require('webpack')
// 自己创建的配置，详情看config目录的index.js
const config = require('../config')
// webpack生产环境配置
const webpackConfig = require('./webpack.prod.conf')

// 转圈圈开启
const spinner = ora('building for production...')
spinner.start()
// 删除旧文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
	// 如果删除错误抛出异常
  if (err) throw err
	// 开启webpack
  webpack(webpackConfig, (err, stats) => {
		// 转圈圈停止
    spinner.stop()
		如果有错误抛出异常
    if (err) throw err
		// 打印文件 https://cloud.tencent.com/developer/section/1477339#stage-100055423
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

		// 如果有错误
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
			// 进程停止
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
