import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import ElementPlus from 'element-plus'
import store from './store'

import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './loading/permission'

// import "./permission"
import permission from './directives/permission'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
 app.use(router).use(ElementPlus).use(store).use(permission).mount('#app')
