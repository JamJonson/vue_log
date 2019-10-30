// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import {router} from './router'
import store from './store'
// 全局组件注入
// import componentsInject from '@/components/inject'
// 全局自定义指令
// import directive from '@/utils/directive'
// 一些公共方法
// import util from '@/utils/util.js'
// import '@/components/conversation' // 会话
// A modern alternative to CSS resets
// import 'normalize.css'
// element-ui所有组件，性能优化可选择性导入
// import ElementUI from 'element-ui'
// import '@/assets/Element-ui/theme/index.css' // element-ui 自定义主题

// import '@/assets/sass/index.scss' // 自定义样式
// import '@/assets/sass/hover/hover-min.css' // A collection of CSS3 powered hover effects to be applied to links, buttons, logos, SVG, featured images and so on. Easily apply to your own elements, modify or just use for inspiration. Available in CSS, Sass, and LESS.
// import '@/utils/filter'

// import VueBus from 'vue-bus'
// import ECharts from 'vue-echarts/components/ECharts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/markArea'
// import 'echarts/lib/component/title'
// 复制功能
// import ClipboardJS from 'clipboard'

// import sentry from './sentry'
// Vue.use(sentry) // sentry
// require('babel-polyfill')

// var _ = require('lodash')
// Vue.component('v-chart', ECharts)
// Vue.use(VueBus) // vue 事件总线

// Vue.use(ElementUI)
// Vue.use(componentsInject)
// Vue.use(directive)

// 阻止启动生产消息
Vue.config.productionTip = false

// Vue.prototype._ = _
// Vue.prototype.util = util
// window.idtUtil = util // 基于 使用简洁性和实用性考虑，将 util绑定到window对象上面，暂有idtDebounce方法 须如此使用
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// new ClipboardJS('.copyBtn')
