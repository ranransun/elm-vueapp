// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from './router'
import VueRouter from 'vue-router'
import VueRsource from 'vue-resource'
import Goods from './components/goods/Goods'
import Seller from './components/seller/Seller'
import Rating from './components/ratings/Rating'

import './common/stylus/icon.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueRsource)

const router=new VueRouter({
	routes:[{path:'/Goods',component:Goods},
	        {path:'/Seller',component:Seller},
	        {path:'/Rating',component:Rating}
	        ],
	mode:"history",
	linkActiveClass:"active"
})
// const app = new Vue({
//   router
// }).$mount('#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
