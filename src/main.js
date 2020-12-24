import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
// import './assets/css/style.scss'
import store from './store'
import router from "./router"
import MoviesList from "./components/MoviesList"
import './assets/css/style.scss'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.config.productionTip = false


Vue.component('movies-list', MoviesList)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
