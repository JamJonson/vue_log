# JamJonson

> y

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests 测试环境 http
npm test

# 生成sass文档
npm run sassdoc

# 生成js文档
npm run jsdoc

# Visualize size of webpack output files with an interactive zoomable treemap.
npm run report

# mock server
cd mock_server
npm start
```

#部署
  校验  http_env
  校验云信 appkey

# 技术选型
  基础: vue 全家桶
  中间层: express
  css预处理: sass
  css后处理: postCss
  es支持: babel
  调试工具: chrome/vue-dev-tools
  包管理工具: npm
  前后端通信: axios
  代码检查工具: eslint

  css rest: normalize.css
  基本组件库: Element
  动画库: hover.css animate.css
  富文本: tinymce

# 添加新功能开发步骤
  1 创建页面文件
    实例(正确)
    idoctor/src/view/bloodSugar/bloodSugar_record/index.vue
    在view目录下面
      bloodSugar 是模块名
      bloodSugar_record 功能名
      index.vue 具体页面
  2 添加路由
    实例(正确)
      idoctor/src/router/modules/bloodSugar/index.js
      idoctor/src/router/modules/bloodSugar/bloodSugar_record.js
      在router/modules 目录下面
        bloodSugar 模块
        index.js 模块路由 每个模块只有一个


# 后台api 基础url 配置
  http_env 字段是和后台交互api基础路径
  package.json
    "scripts": {
      "dev": "cross-env http_env=http://192.168.1.123:8090/manager-api/ webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "dev_test": "cross-env http_env=http://192.168.1.123:9000/manager-api/ webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "dev_pro": "cross-env http_env=http://192.168.1.123:9000/manager-api/ webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "build": "cross-env http_env=http://192.168.1.123:9000/manager-api/ node build/build.js",
      "build_test": "cross-env http_env=http://192.168.1.123:9000/manager-api/ node build/build.js",
      "build_dev": "cross-env http_env=http://192.168.1.123:8090/manager-api/ node build/build.js",
      "lint": "eslint --ext .js,.vue src test/unit",
      "sassdoc": "sassdoc src",
      "jsdoc": "jsdoc -c conf.json --readme README.md",
      "report": "npm run build --report",
      "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run"
    },
# 按钮级权限控制
  1 在config/permissions_operation.js里面配置前端和后台映射的权限表
    例子:  key 在前端使用，value对应后台的权限
      // 角色管理 start
      org_role_mng_edit_permissions: 'role_save_update', // 角色管理 权限设置
      org_role_mng_add: 'role_save_update', // 角色管理 新增
      org_role_mng_delete: 'role_delete', // 角色管理 删除
      org_role_mng_edit: 'role_save_update' // 角色管理 修改
      // 角色管理 end
  2 在页面使用
    例子: v-has="'org_role_mng_add'"
    <el-button size="mini" v-has="'org_role_mng_add'" @click="add">添加</el-button>

  按钮级权限配置
    1 在  src/mixins/permissions_page.js 配置 （使用vue mixins写法）
      实例：orderProductDetails () {
            // 产品订单详情页面权限
            let flag = this.util.checkPermission('order_product_view')
            return flag
          }
    2 使用
      import permissionsPage from '@/mixins/permissions_page'
      mixins: [mixin, permissionsPage],
      <div v-if="patientsDetails" class="info_basic_list_item_value l-text-center multipleColumnsItem u-borderAll u-link operationFont"
        @click="patientsDetail">
        {{basicInfo.nickname}}
      </div>
      <div v-else class="info_basic_list_item_value l-text-center multipleColumnsItem u-borderAll">
        {{basicInfo.nickname}}
      </div>

# 菜单级权限控制
	一.菜单渲染
		1 在config/permissions_menu.js里面配置前后端映射权限表
		2 在前端路由里面引用
			例： menuCode: permissionsMenu.defaultPermission
		3 登录时从后台获取用户的菜单权限 （这时会插入前端需要自己使用的不受后台权限控制的路由权限）
			idoctor/src/service/api/modules/user.js
```javascript
				// 添加默认有菜单权限的工鞥 暂时在 开发自己使用的功能有使用
        menuList.push(permissionsMenu.defaultPermission)
        sessionstorage.setItem('menuList', JSON.stringify(menuList))
        sessionstorage.setItem('operationList', JSON.stringify(operationList))
```
		4 在sideBar组件匹配前后端权限表渲染菜单
			idoctor/src/components/sideBar/index.vue
	二.在浏览器输入url权限管理
		1 通过vue-router 的路由守卫实现
			idoctor/src/router/index.js
				通过前端路由的配置和后台返回的菜单权限配置判断是否有菜单权限
					if (menuList.some(element => {
						// console.log('element:', element, 'to.meta.menuCode:', to.meta.menuCode)
						return element === to.meta.menuCode || to.meta.menuCode === 'home'
					}))

# mock服务
 1 mock 具体接口写法见/mock_server
 2 配置 mock 服务地址 export const MOCK_URL = 'http://localhost:3000/'
 3 在api里面配置 mock: true, mockPath: '***' 两个字段
  const option = {
    method: 'post',
    path: url.webapiBase + url.addRoles,
    timeout: '',
    mock: true,
    loading: true,
    mockPath: '***'
  }
# loading 框
  在和后台交互时保存 修改 删除时使用
  2 自定义
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
# api 写法
import {
  url,
  doGet,
  doPost
} from '@/service/util'

// 获取当前自定义快捷回复数据
function getData ({
  pageNum = 1,
  pageSize = 10
} = {}) {
  const data = {
    pageNum,
    pageSize
  }
  return doGet(data, url.quickReplyCustom_list)
}


# 编辑或添加页面成功后返回列表页面刷新列表页面数据实现方案 版本1
1 注入 inject: ['reLoad'], // 头部刷新页面功能
2 在需要的地点调用
例:
this.$router.go(-1)
this.reLoad()

# 列表页面数据实现方案 版本2
使用 vue-bus
1 绑定事件
this.$bus.on('refreshData', () => {
      console.log('事件总线')
      this.getData(this.searchForm)
    })
2 触发事件
	this.$bus.emit('refreshData')

# 项目自定义主题
1 修改element-variables.scss 里面的变量
2 在终端里面执行 et
3 将 idoctor/theme/font目录和index.css 文件复制到idoctor/src/assets/sass/Element-ui/theme/

# 二级菜单写法
  path: 'role', // vue-router 语法，必须填写，且不能重复
  name: 'role', // 必须
  hidden: false,
  meta: {
    title: '角色管理',
    head: true, // 是否是二级菜单 , 如果是则渲染group的值, 值为true时会渲染出二级菜单
    group: '组织管理', // 三级菜单所属的二级菜单
    menuCode: permissionsMenu.org_staff_mgnt,
    path: '/organization/role' , 项目自己使用，必须填写，在渲染菜单时使用，若填写错误，菜单将不能正常使用
  },

# 全局组件注入
在components/inject.js
/**
 * descript
 * 组件全局注册
 * @access public
 * @author 燕鹏
 * @return {string} The blended color.
*/
// 全局组件注入 start
import permissionButton from '@/components/permissionButton/index.vue'
import pageHeader from '@/components/header/index.vue'
import listHeader from '@/components/listHeader/index.vue'
import searchHeader from '@/components/searchHeader/index.vue'
// 全局组件注入 end

export default {
  install: (Vue, options) => {
    Vue.component('permission-button', permissionButton)
    Vue.component('page-header', pageHeader)
    Vue.component('list-header', listHeader)
    Vue.component('search-header', searchHeader)
    // 需要挂载的都放在这里
  }
}

# input 输入控制
  通过mixins实现
    @keyup.native="positiveInteger"
    import { positiveInteger } from '@/util/validation.js'
    mixins: [positiveInteger],
# post 请求放抖动
  submitForm: window.idtUtil.idtDebounce(function () {

  })

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
