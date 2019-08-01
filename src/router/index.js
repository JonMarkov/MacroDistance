import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    // // 授权
    {
      path: '/',
      name: 'ground',
      component: () =>
        import('@/components/microLogin/ground'),
      meta: {

        title: '看看视频'
      }
    },
    // 首页
    {
      path: '/index',
      name: 'getuserinfo',
      component: () =>
        import('@/components/getUserInfo/getuserinfo'),
      meta: {
        title: '看看视频'
      }
    },
    //中间件
    {
      path: '/jump',
      name: 'jump',
      component: () =>
        import('@/components/microDownloaded/jump'),
      meta: {
        title: '看看视频'
      }
    },
    //非微信
    {
      path: '/getuserinfoqq',
      name: 'getuserinfoqq',
      component: () =>
        import('@/components/getUserInfo/getuserinfo_qq'),
      meta: {
        title: '看看视频'
      }
    },
    //活动页面
    {
      path: '/activity',
      name: 'activity',
      component: () =>
        import('@/components/activity/activity'),
      meta: {
        title: '手机拍绵竹'
      }
    },
    //活动页面
    {
      path: '/activity1',
        name: 'activity',
      component: () =>
    import('@/components/activity/activity1'),
      meta: {
      title: '手机拍绵竹'
    }
    },
    //上传视频页面
    {
      path: '/uploadvideo',
      name: 'uploadvideo',
      component: () =>
        import('@/components/activity/uploadvideo'),
      meta: {
        title: '手机拍绵竹'
      }
    },
    //上传视频成功
    {
      path: '/uploadsuccess',
      name: 'uploadsuccess',
      component: () =>
        import('@/components/activity/uploadsuccess'),
      meta: {
        title: '手机拍绵竹'
      }
    },
    //pc活动
    {
      path: '/activity/index.html',
        name: 'index',
      component: () =>
    import('@/components/activity/index'),
      meta: {
      title: '手机拍绵竹'
    }
    },
    //四川绵竹活动微剧播放页面
    {
      path: '/getuserinfo_mz',
      name: 'getuserinfo_mz',
      component: () =>
        import('@/components/mianzhuGetUserInfo/getuserinfo_mz'),
      meta: {
        title: '看看视频'
      }
    },
    //四川绵竹活动微剧排行榜
    {
      path: '/ranking',
      name: 'ranking',
      component: () =>
        import('@/components/mianzhuGetUserInfo/ranking'),
      meta: {
        title: '看看视频'
      }
    }
  ]
})

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
