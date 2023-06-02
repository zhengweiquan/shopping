// import './styles/normalize.css'
import './styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入全局组件注册
import { componentPlugin } from './components/components'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(componentPlugin) //全局组件注册

app.mount('#app')
// 定义全局指令  图片懒加载
