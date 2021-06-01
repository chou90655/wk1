import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// store
import store from './store'
Vue.prototype.$store = store
// tip
import tip from'./common/util/tip.js'
Vue.prototype.$tip=tip;
// config
import configService from'./common/service/config.service.js'
Vue.prototype.$config=configService;
// ak
import ak from './common/ak.js';
Vue.prototype.$ak = ak;

// request请求
import { http } from '@/common/service/service.js'
Vue.prototype.$http = http

Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
