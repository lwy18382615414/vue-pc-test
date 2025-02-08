import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store/index'


const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
