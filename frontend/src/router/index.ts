import { createRouter, createWebHistory } from "vue-router"
import routes from './router-map'

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router