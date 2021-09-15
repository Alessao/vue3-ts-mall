import { createApp } from 'vue'
import { globalRegister } from './global'
// import hyRequest from './service'
import 'normalize.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'
import store from './store/main'
import { setupStore } from './store/main'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
