import { defineStore } from "pinia"

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => {
    return {
      selectedItemName: 'Index'
    }
  },
  actions: {
    setSelectedItemName(selectedItemName: string) {
      this.selectedItemName = selectedItemName
    }
  },
  persist: {
    enabled: true
  }
})