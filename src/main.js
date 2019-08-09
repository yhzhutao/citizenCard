// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './assets/css/reset.css';
import './assets/css/element-variables.scss'
import {
  api,
  get,
  post
} from './assets/api'
import BaiduMap from 'vue-baidu-map'
import {filter} from './common/utils'
import store from './store'
import router from './router'

Vue.use(BaiduMap, {
  ak: 'cmFGpjILvA6Y6bbcoGDrv1ks8af3llkV'
})


Vue.use(ElementUI);
// axios.defaults.timeout = 10000;
Vue.config.productionTip = false
console.log(Object.keys(filter))
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});
// axios.interceptors.response.use((response) => {
//   // Do something before request is sent
//   return response;
// }, (error) => {
//   return Promise.reject(error);npm run dev
// })
// 'Content-Type': 'application/json',authentication_name

Vue.prototype.$api = api
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$axios = axios
// Vue.prototype.HOST = '/apiword' //官网
Vue.prototype.HOST = `${api.api}/gw/personalCenter/per` //个人中心
// let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
// let baseWordurl = `${api.api}/gw/personalCenter/per`
// Vue.prototype.SEVER = '/apiex' //官网
Vue.prototype.SEVER = `${api.api}/gw/personalCenter/musServer/musServer.svr` //个人中心
// axios.defaults.baseURL = '/apip'
// axios.defaults.headers.post['Content-Type'] = 'application/json';



new Vue({
  el: '#app',
  linkExactActiveClass: 'active',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
