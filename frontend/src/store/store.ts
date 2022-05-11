import { defineStore } from "pinia"

export const useStore = defineStore({
  id: 'store',
  state: () => {
    return {
      id: '',
      name: '',
      selectedItemName: 'Index'
    }
  },
  actions: {
    setID(id: string) {
      this.id = id
    },
    setName(name: string) {
      this.name = name
    },
    setSelectedItemName(selectedItemName: string) {
      this.selectedItemName = selectedItemName
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, paths: ['id', 'name']
      },
      {
        storage: sessionStorage, paths: ['id', 'name']
      }
    ]
  }
})