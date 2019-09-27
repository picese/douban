// Vue 组件部分
import Vue from 'vue'; // 导入 vue 

import VueRouter from 'vue-router'; // 导入路由

Vue.use(VueRouter); // 设置路由

import VueResource from 'vue-resource'
Vue.use(VueResource)

 
// UI 组件部分
import { Header,Swipe, SwipeItem,Button,Loadmore} from 'mint-ui'; // 按需求导入 头部导航，轮播图 mint-ui

Vue.component(Header.name, Header); // 使用 Vue.component 注册 按钮组件
Vue.component(Swipe.name, Swipe); // 使用 Vue.component 注册 轮播组件
Vue.component(SwipeItem.name, SwipeItem); // 使用 Vue.component 注册 轮播列表组件
Vue.component(Button.name, Button); // 使用 Vue.component 注册 按钮组件
Vue.component(Loadmore.name, Loadmore);

import 'mint-ui/lib/style.css'; // 导入 mint-ui 样式

import './lib/mui/css/mui.min.css'; // 导入 mui 样式

import './lib/mui/css/icons-extra.css'; // 导入 icons-extra 样式

import './lib/mui/js/mui.min.js'


// 自定义文件
import router from './router.js'; // 导入路由文件

import app from './App.vue'; // 导入 App.vue 文件




var vm = new Vue({
	el:'#app',
	render:function(c){ return c(app) }, // 渲染组件( app 文件)
	router // 把路由挂载到页面
})