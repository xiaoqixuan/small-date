// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import Request from './utils/request'
import VueCookie from 'vue-cookie'
// import VueScroller from 'vue-scroller' // 上拉加载，下拉刷新插件
import 'mescroll.js/mescroll.min.css';
import MeScroll from 'mescroll.js';
Vue.prototype.MeScroll=MeScroll;
router.beforeEach((to,from,next) => {
  window.document.title = to.meta.title
  next()
})

Vue.use(Mint)
Vue.use(VueResource)
Vue.use(Request)
Vue.use(VueCookie)
// Vue.use(VueScroller)

Vue.config.productionTip = false
// Vue.http.interceptors.push((request,next)=>{
//   //request.credentials = true; // 接口每次请求会跨域携带cookie
//   //request.method= 'POST'; // 请求方式（get,post）
//   request.headers.set('content-type','application/x-www-form-urlencoded') // 请求headers携带参数

//   next(function(response){
//    return  response;

//   });
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
