import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthorizationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
