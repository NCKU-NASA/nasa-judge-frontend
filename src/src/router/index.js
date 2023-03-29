import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Lab from '../views/Lab.vue'
import Passwd from '../views/Passwd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/lab',
    name: 'Lab',
    component: Lab
  },
  {
    path: '/passwd',
    name: 'Passwd',
    component: Passwd
  }
]

const router = new VueRouter({
  routes
})

export default router
