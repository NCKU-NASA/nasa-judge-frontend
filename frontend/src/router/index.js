import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Lab from '../components/Lab.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
