import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/icon.css';
import './assets/css/main.css';

//引入element-ui
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
//createApp(App)不能被覆盖
const app = createApp(App)

app.use(ElementPlus).use(store).use(router)
//必须最后挂载
app.mount('#app')

//引入axios
// import axios from 'axios'
// import qs from 'qs'
// const app = createApp(App)
// //全局配置
// app.config.globalProperties.$http=axios;
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(VueAxios, axios)
axios.defaults.timeout = 5000 // 请求超时
// axios.defaults.retry = 3;                 //请求次数
// axios.defaults.retryDelay = 1000;         //请求间隙
// axios.defaults.baseURL = '/api/'  // api 即上面 vue.vue.config.js 中配置的地址

// //引入echarts
// import * as echarts from 'echarts'
// // vue3
// app.config.globalProperties.$echarts = echarts

// 引入cookie
// import VueCookies from 'vue-cookies'
// createApp(App).use(VueCookies)
// import Vue from 'vue'

