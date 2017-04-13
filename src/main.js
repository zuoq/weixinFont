import Vue from 'vue'
import Message from './message.vue'
import Show from './show.vue'
import Admin from './admin.vue'
import Search from './search.vue'
import VueRouter from 'vue-router'
import VueRes from 'vue-resource'
import Modal from './assets/modal.js'

Vue.use(VueRes)
Vue.use(Modal)
Vue.http.options.xhr = {
    withCredentials : true
}


const routes = [
    {path:'/',component:Message},
    {path:'/show',component:Show},
    {path:'/admin',component:Admin},
    {path:'/search',component:Search},
]

const router = new VueRouter( {
    routes
})
Vue.use(VueRouter)

new Vue({
    router
}).$mount("#app")
