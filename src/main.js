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

import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "286d57d14354a1b2a259db33457322746911d897705526c422f6f18ff548f611"
fundebugVue(fundebug, Vue);

Vue.use(ElementUI)
Vue.use(lists)
Vue.use(shops)
Vue.use(shares)
Vue.use(listss)
Vue.prototype.wx = wx
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs 
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
