import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./assets/basic.less";
import "./assets/content.css";
import "./assets/reset.min.css";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
