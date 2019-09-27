
import VueRouter from 'vue-router'; // 导入 vue 模块

// 导入文件
import HomeContainer from './components/TabBer/HomeContainer.vue'; // 引入 HomeContainer 文件
import SearchContainer from './components/TabBer/SearchContainer.vue'; // 引入 SearchContainer  文件

import ShowingUp from './components/Navigation/ShowingUp.vue'; // 引入 ShowingUp文件
import ComingSoon from './components/Navigation/ComingSoon.vue'; // 引入 ComingSoon 文件
import EuroBoxOffice from './components/Navigation/EuroBoxOffice.vue'; // 引入 EuroBoxOffice 文件
import WordOfMouthList from './components/Navigation/WordOfMouthList.vue'; // 引入 WordOfMouthList 文件
import NewMovieList from './components/Navigation/NewMovieList.vue'; // 引入 NewMovieList 文件
import TOP250 from './components/Navigation/TOP250.vue'; // 引入 OP250 文件

import MovieDetails from './components/DetailsPage/MovieDetails.vue' // MovieDetails文件
var router = new VueRouter({ // 开启路由
	routes:[ // 设置路由
		{ path:'/',redirect : '/home'}, // 默认显示的页面
		{ path:'/home',component: HomeContainer }, // 主页的路由配置
		{ path:'/search',component: SearchContainer }, // 搜索的路由配置
		{ path:'/home/Navigation/ShowingUp',component: ShowingUp}, // 正在热映选项的路由配置
		{ path:'/home/Navigation/ComingSoon',component:ComingSoon},// 即将上映选项的路由配置
		{ path:'/home/Navigation/EuroBoxOffice',component:EuroBoxOffice},// 北美票房榜选项的路由配置
		{ path:'/home/Navigation/WordOfMouthList',component:WordOfMouthList},// 内地票房榜选项的路由配置
		{ path:'/home/Navigation/NewMovieList',component:NewMovieList},// 新片榜选项的路由配置
		{ path:'/home/Navigation/TOP250',component:TOP250},// top250选项的路由配置
		{ path:'/home/DetailsPage/MovieDetails/:id/:title',component: MovieDetails} // 电影详情页的路由配置
	],
	linkActiveClass:'mui-active' // TarBar选中时显示高亮效果 
})

export default router