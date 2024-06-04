import { createApp } from 'vue'
import './assets/main.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import {createPinia} from 'pinia'
import {createPersistedState} from "pinia-persistedstate-plugin";

const pinia = createPinia()
pinia.use(createPersistedState())
createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app')


