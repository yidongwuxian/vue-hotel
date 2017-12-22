// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
//引入vue Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import http from "./utils/http"
import 'iview/dist/styles/iview.css'
import "./utils/filter"
import store from './store'


Vue.use(iView);
//使用vue Swiper
Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false



//将http添加在vue原型上
Vue.prototype.$http = http;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})