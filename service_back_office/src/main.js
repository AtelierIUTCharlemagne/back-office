import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from './plugins/font-awesome'
import router from './router'
import store from "./store";

createApp(App).use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(store)
    .mount('#app')
