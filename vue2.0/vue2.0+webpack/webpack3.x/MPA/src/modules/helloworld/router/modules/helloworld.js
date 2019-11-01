/**
 * router 产品
 * @access public
 */
export default [{
  path: '/hellow',
  name: '',
  hidden: false,
  meta: {
    title: 'hellow'
    // img: require('@/assets/img/产品.png') // 菜单显示的图标
  },
  component: resolve => require(['@/view/helloworld/index.vue'], resolve),
  children: [
    // children 的值是三级菜单 并且应体现所属二级菜单的顺序在二级菜单的第一个值设置 head: true
  ]
}]
