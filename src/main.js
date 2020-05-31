// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Api from './api/index.js'


console.log(Api)
Vue.prototype.$api = Api
Vue.config.productionTip = false
console.log(Vue.prototype.$api)


// 使用elementUI
Vue.use(ElementUI)

Vue.use(require('vue-cookies'))
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
