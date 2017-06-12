import Vue from 'vue'
import Message from './message.vue'
import Message2 from './message2.vue'
import Show from './show.vue'
import Show2 from './show2.vue'
import Admin from './admin.vue'
import Admin2 from './admin2.vue'
import Search from './search.vue'
import Search2 from './search2.vue'
import VueRouter from 'vue-router'
import VueRes from 'vue-resource'
import Modal from './assets/modal.js'

Vue.use(VueRes)
Vue.use(Modal)
Vue.http.options.xhr = {
    withCredentials : true
}


const routes = [
    {path:'/index',component:Message},
    {path:'/show',component:Show},
    {path:'/admin',component:Admin},
    {path:'/search',component:Search},
    // 二期路由
    {path:'/',component:Message2},
    {path:'/show2',component:Show2},
    {path:'/admin2',component:Admin2},
    {path:'/search2',component:Search2}
]

const router = new VueRouter( {
    routes
})
Vue.use(VueRouter)

new Vue({
    router
}).$mount("#app")
