import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/pages/index.vue')
      }
    ]
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-books',
        component: () => import('@/pages/books/all-books.vue')
      },
      {
        path: 'lend',
        name: 'lend-books',
        component: () => import('@/pages/books/lend.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/pages/404.vue')
  }
]

export default routes