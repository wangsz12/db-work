import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/main-layout.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  }
]

export default routes