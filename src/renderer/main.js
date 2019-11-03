import Vue from 'vue'
import axios from 'axios'
import router from './router'
import vuetify from '../plugins/vuetify'


import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  vuetify,
  template: '<App/>'
}).$mount('#app')
