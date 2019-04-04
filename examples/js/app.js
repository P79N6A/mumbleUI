import Vue from 'vue'
import VueRouter from 'vue-router'
import UiWebank from '../../src'
import '../../src/styles/index.scss'
import 'highlight.js/styles/github-gist.css'
// =====================加载路由配置=================
import router from './router'
import App from '../views/App.vue'
import panel from '../views/panel.vue'

// ======================全局配置====================
Vue.config.debug = true;

// ====================== 安装插件===================
// install router
Vue.use(VueRouter);
// install 组件库
Vue.use(UiWebank, {
    locale: 'zh-cn'
});

Vue.component('panel', panel)

new Vue({
    el: '#app',
    extends: App,
    router: router
})