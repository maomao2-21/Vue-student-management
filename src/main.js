import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';

// AdminLTE-3.0.5 模板样式
import './assets/css/adminlte.css';
// 全局通用样式
import './assets/css/tools.css';
import './assets/css/style.css';
// 字体
import './assets/font/font.css';
// 阿里图标库
import './assets/font/iconfont.css';
import './assets/font/iconfont.js';

//ajax请求
import {
  post,
  get,
  delet,
  put,
  baseURL
} from './assets/request/http';
import {
  requestHandle,
  sysPow,
  timeToDay,
  timeToMin
} from './assets/js/handle';
import {
  getNestingValue
} from './assets/js/nesting'


Vue.prototype.baseURL = baseURL;
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$delete = delet
Vue.prototype.$put = put
Vue.prototype.$requestHandle = requestHandle
Vue.prototype.$sysPow = sysPow
Vue.prototype.$timeToDay = timeToDay
Vue.prototype.$timeToMin = timeToMin
Vue.prototype.$getNestingValue = getNestingValue



// 表单验证组件
import verify from "vue-verify-plugin";

// jquery
import $ from 'jquery';
// 全局方法调用
import imCommon from './plugins/Common.js';
// 网站标题
import VueWechatTitle from 'vue-wechat-title';

// 全局方法调用
Vue.use(imCommon);
// 网站标题
Vue.use(VueWechatTitle);
// 表单验证组件
Vue.use(verify);

// jquery
Vue.prototype.$ = $;

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');