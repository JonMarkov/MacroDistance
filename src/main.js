// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { lists,shops,shares,listss  } from '@/publicView'

// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "286d57d14354a1b2a259db33457322746911d897705526c422f6f18ff548f611"
// fundebugVue(fundebug, Vue);

Vue.use(ElementUI)
Vue.use(lists)
Vue.use(shops)
Vue.use(shares)
Vue.use(listss)
Vue.prototype.wx = wx
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if(to.name=="getuserinfo" || to.name=="activity"  || to.name=="index" || to.name=="getuserinfo_mz"){
    setTimeout(()=>{
      var _hmt = _hmt || [];
      (function() {
        //每次执行前，先移除上次插入的代码
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?f85580b78ebb540403fe1f04da080cfd";
        hm.id = "baidu_tj";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();

    },50)
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
