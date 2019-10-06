import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/styles/index.styl'

// 引入icons
import '@/icons/index'
// 引入iviews
import './iviews'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
