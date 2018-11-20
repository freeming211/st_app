// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'


// 点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)
// ES6 promise
import promise from 'es6-promise'
promise.polyfill()

// axios 配置
import './common/js/http'

// 引入mint 
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// mint swipe 图片滑动 和 滚动加载
import { Swipe, SwipeItem,InfiniteScroll } from 'mint-ui';
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.use(InfiniteScroll);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$http = axios
axios.defaults.withCredentials = true  //携带cookie
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// style统一样式
import '@/common/css/style.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
