import Axios from "@/config/axios"
import { CreateCategoryRequest } from "@/utils/types"

export function getCategoryDataBox() {
  return Axios.get('/data-box/categories')
}

export function getCategoriesByPage(page = 1) {
  return Axios.get('/categories', {
    params: {
      page
    }
  })
}

export function deleteCategoryByID(id: string) {
  return Axios.delete('/categories', {
    params: {
      id
    }
  })
}

export function getAllParentCategories() {
  return Axios.get('/categories/parent')
}

export function getAllSubCategories() {
  return Axios.get('/categories/sub')
}

export function createCategory({ id, name, parent }: CreateCategoryRequest, isParent: boolean) {
  return Axios.post('/categories', {
    id,
    name,
    parent: isParent ? null : parent
  })
}