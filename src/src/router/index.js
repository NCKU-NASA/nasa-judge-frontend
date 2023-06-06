import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Lab from '../views/Lab.vue'
import Passwd from '../views/Passwd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Lab',
    component: Lab
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/passwd',
    name: 'Passwd',
    component: Passwd
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
