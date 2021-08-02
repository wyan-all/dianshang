import Vue from 'vue'
import VueRouter from 'vue-router'
import Log from '../components/Login.vue'
import Home from '../components/home'
import '../mock'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Log
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
