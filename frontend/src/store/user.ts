import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: 'Test'
    }
  },
  actions: {
    setName(name: string) {
      this.name = name
    }
  },
  persist: {
    enabled: true
  }
})