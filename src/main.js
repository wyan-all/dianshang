import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
// 使用element ui时也需要同时引入这个文件，样式才能生效
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.$http = axios // 使得每个vue组件都能够通过this.$http访问axios发起ajax请求
axios.defaults.baseUR = ''
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
