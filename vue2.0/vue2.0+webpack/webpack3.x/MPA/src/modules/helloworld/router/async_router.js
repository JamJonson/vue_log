// 一级菜单start
import helloworld from './modules/helloworld'
// 一级菜单end

// asyncRouter 会在sider组件里面引用,用于判断是否有此菜单的权限，有则显示，无则不显示
export const asyncRouter = [
  ...helloworld
]
