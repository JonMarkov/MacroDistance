import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
	mode: 'history',
	routes: [
		// // 授权
		// {
		// 	path: '/',
		// 	name: 'ground',
		// 	component: () =>
		// 		import('@/components/ground'),
		// 	meta: {
    //
		// 		title: '看看授权'
		// 	}
		// },
		// 首页
		{
			path: '/',
			name: 'getuserinfo',
			component: () =>
				import('@/components/getuserinfo'),
			meta: {
				title: '看看视频微剧场'
			}
		}

	]
})

router.afterEach((to, from, next) => {
	if(to.meta.title) {
		document.title = to.meta.title
	}
})

export default router
