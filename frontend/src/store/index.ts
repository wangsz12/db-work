import { createPinia, Pinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const store: Pinia = createPinia()
store.use(piniaPersist)

export default store

export { useStore } from './store'
// export { useGlobalStore } from './global'
// export { useUserStore } from './user'