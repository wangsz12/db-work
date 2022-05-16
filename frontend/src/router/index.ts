import { useMessage } from "@/utils"
import { createRouter, createWebHistory } from "vue-router"
import routes from './router-map'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useStore } from "@/store"

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.name !== 'login' && !localStorage.getItem('token')) {
    useMessage().warning('请先登录')
    next('/login')
  }
  else {
    next()
  }
})

router.afterEach((to) => {
  useStore().setSelectedItemName(to.name as string)
  NProgress.done()
})

export default router