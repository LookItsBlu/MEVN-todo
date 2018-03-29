import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter({routes})
})
