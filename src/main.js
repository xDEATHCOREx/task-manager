import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './globalStyle.css'
import axios from './http'
// 将axios 挂载到prototype上，在组件中可以直接使用this.axios访问!!重要！！
Vue.prototype.axios = axios 

Vue.use(MuseUI)

new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
