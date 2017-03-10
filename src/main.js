import Vue from 'vue'

console.log(Vue)
console.log(window)

import vueRouter from 'vue-router'
import UiWebank from './components/pc/dist/ui-webank.js'
// import UiWebank from './components/pc/src/index.js'
import './components/pc/dist/styles/ui-webank.css'
import App from './App'

console.log(UiWebank)

//=====================加载路由配置=================
import { configRouter } from './route-config'

//======================全局配置====================
Vue.config.debug = true;

//====================== 安装插件===================
// install router
Vue.use(vueRouter);
// install 组件库
Vue.use(UiWebank);

//======================配置路由=====================
const router = new vueRouter();
configRouter(router);


//启动路由 路由器会创建一个 App 实例
router.start(App, '#app');
