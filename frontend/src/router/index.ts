import { createRouter, createWebHistory } from "vue-router"
import routes from './router-map'

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('token')) {
    next('/login')
  }
  else {
    next()
  }
})

export default router