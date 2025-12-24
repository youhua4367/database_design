import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-plugin-persistedstate"
import ElementPlus from "element-plus";

import "./assets/styles/main.scss"


const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
