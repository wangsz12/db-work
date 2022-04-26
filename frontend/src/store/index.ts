import { createPinia, Pinia } from "pinia"

const store: Pinia = createPinia()

export default store

export { useUserStore } from './user'
export { useGlobalStore } from './global'