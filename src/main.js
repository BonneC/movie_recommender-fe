import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import router from "./router"
import MoviesList from "./components/MoviesList"
import './assets/css/style.scss'
import VModal from 'vue-js-modal'



Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VModal)
Vue.config.productionTip = false


Vue.component('movies-list', MoviesList)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
