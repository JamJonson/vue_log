// https://eslint.org/docs/user-guide/configuring
/**
 * AlloyTeam ESLint 规则
 * https://alloyteam.github.io/eslint-config-alloy/
 *
 * 贡献者：
 *     xcatliu <xcatliu@gmail.com>
 *     heyli <lcxfs1991@gmail.com>
 *     DiamondYuan <admin@diamondyuan.com>
 *     Dash Chen <noreply@github.com>
 *     Swan <noreply@github.com>
 *
 * 依赖版本：
 *     eslint ^6.2.2
 *     babel-eslint ^10.0.1
 *     eslint-plugin-react ^7.14.2
 *     vue-eslint-parser ^5.0.0
 *     eslint-plugin-vue ^5.2.3
 *     @typescript-eslint/parser ^2.0.0
 *     @typescript-eslint/eslint-plugin ^2.0.0
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @category 此规则属于哪种分类
 * @reason 为什么要开启（关闭）此规则
 * @fixable 支持自动修复
 */
module.exports = {
  // 以当前目录为根目录，不再向上查找 .eslintrc.js
  // https://www.cnblogs.com/ruanyifeng/p/5283708.html
  root: true,
  // 通过parserOptions，允许指定校验的ecma的版本，及ecma的一些特性
  parserOptions: {
    // 默认使用esprima做脚本解析，当然你也切换他，比如切换成babel-eslint解析
    parser: 'babel-eslint' //默认，可以设置成babel-eslint，支持jsx
  },
  // Environment可以预设好的其他环境的全局变量，如brower、node环境变量、es6环境变量、mocha环境变量等
  env: {
    browser: true,
  },
  // 指定你所要使用的全局变量，true代表允许重写、false代表不允许重写
  globals: {
    WeixinJSBridge: true,
    WebViewJavascriptBridge: true
  },
  // extends是EsLint默认推荐的验证，你可以使用配置选择哪些校验是你所需要的，可以登录npmjs.com查看
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  // 自定义规则，一般格式：”规则名称”:error级别系数。系数0为不提示(off)、1为警告(warn)、2为错误抛出(error)，可指定范围，如[1,4]可以包括Strict模式、也可以是code的方式提醒，如符号等。还可以是第三方的校验
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
