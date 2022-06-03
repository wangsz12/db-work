import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/index',
    redirect: '/',
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
        path: 'new',
        name: 'new-book',
        component: () => import('@/pages/books/new-book.vue')
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
    path: '/categories',
    name: 'categories',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-categories',
        component: () => import('@/pages/categories/all-categories.vue')
      },
      {
        path: 'new',
        name: 'new-category',
        component: () => import('@/pages/categories/new-category.vue')
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
      },
      {
        path: 'new',
        name: 'new-card',
        component: () => import('@/pages/cards/new-card.vue')
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
    path: '/publishers',
    name: 'publishers',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-publishers',
        component: () => import('@/pages/publishers/all-publishers.vue')
      },
      {
        path: 'new',
        name: 'new-publisher',
        component: () => import('@/pages/publishers/new-publisher.vue')
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: () => import('@/pages/publishers/purchase-book.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'all-admin',
        component: () => import('@/pages/admin/all-admin.vue')
      },
      {
        path: 'new',
        name: 'new-admin',
        component: () => import('@/pages/admin/new-admin.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layout/main-layout.vue'),
    children: [
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('@/pages/user/change-pwd.vue')
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