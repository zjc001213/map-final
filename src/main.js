import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '@/router/index.js'

Vue.use(ElementUI)

// common css
import "@/style/common.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

store.dispatch("getRainfallList")
store.dispatch("getGatestationList")
