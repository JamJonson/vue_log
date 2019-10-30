import Vue from 'vue'
import Router from 'vue-router'
import {asyncRouter} from './async_router'
import {generalRouter} from './general_router'
import guard from './router_guard'
Vue.use(Router)

// 初始化路由
let router = new Router({
  routes: [
    ...generalRouter,
    ...asyncRouter
  ]
})

guard(router, Vue) // 路由守卫
export {
  asyncRouter,
  router
}
