import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-plugin-persistedstate"
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import router from './router'

import "./assets/styles/main.scss"
import "./assets/styles/global.css"

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser, faHouse,  faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faHouse, faMagnifyingGlass);

import 'element-plus/dist/index.css'


const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
