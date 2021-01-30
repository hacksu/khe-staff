import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import backend from './backend'

createApp(App).use(store).use(router).use(backend).mount('#app')
