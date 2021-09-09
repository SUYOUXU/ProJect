import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from 'axios';
import request, {
  baseUrl
} from './utils/request'
// export const baseUrl='http://120.76.247.5:2003'
// const instance = axios.create({
//   withCredentials:true
// })
// axios.defaults.withCredentials=true
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$request = request;
Vue.prototype.$axios = axios

// Vue.prototype.$baseUrl='http://120.76.247.5:2003'
Vue.config.productionTip = false
Vue.use(Vant)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')