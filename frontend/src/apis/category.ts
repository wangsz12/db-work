import { mockAPIReturn } from "@/utils"
import { CreateCategoryRequest } from "@/utils/types"

export function getCategoryDataBox() {
  return mockAPIReturn({
    total: 253,
    parents: 22
  })
}

export function getCategoriesByPage(page = 1) {
  return mockAPIReturn({
    total: 253,
    categories: Array(10).fill('').map((_, index) => ({
      id: String(index),
      name: 'xxx',
      parent: 'XXX'
    }))
  })
}

export function deleteCategoryByID(id: string) {
  return mockAPIReturn()
}

export function getAllParentCategories() {
  return mockAPIReturn(Array(22).fill('').map((_, index) => ({
    id: String(index),
    name: String(index)
  })))
}

export function createCategory({ name, parent }: CreateCategoryRequest) {
  return mockAPIReturn()
}