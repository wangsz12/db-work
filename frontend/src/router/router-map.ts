import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  },
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
        path: 'lend/record',
        name: 'lend-records',
        component: () => import('@/pages/books/lend-record.vue')
      },
      {
        path: 'lend',
        name: 'lend-books',
        component: () => import('@/pages/books/lend.vue')
      },
      {
        path: 'return/record',
        name: 'return-records',
        component: () => import('@/pages/books/return-record.vue')
      },
      {
        path: 'return',
        name: 'return-books',
        component: () => import('@/pages/books/return.vue')
      }
    ]
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-cards',
        component: () => import('@/pages/cards/all-cards.vue')
      }
    ]
  },
  {
    path: '/fines',
    name: 'fines',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-fines',
        component: () => import('@/pages/fines/all-fines.vue')
      },
      {
        path: 'pay',
        name: 'pay-fine',
        component: () => import('@/pages/fines/pay-fine.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/pages/404.vue')
  }
]

export default routes