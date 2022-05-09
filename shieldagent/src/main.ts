import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// agetn title
document.title = '神盾'
// 页面禁止复制
document.onselectstart = function () { return false }
createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
