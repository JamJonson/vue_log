// 路由首位
const guard = (router, Vue) => {
  router.beforeEach((to, from, next) => {
    next()
  })
}
export default guard
