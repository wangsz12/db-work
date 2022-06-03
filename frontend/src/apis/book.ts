import Axios from "@/config/axios"
import { CreateBookRequest, PurchaseRequest } from "@/utils/types"

export function getBookDataBox() {
  return Axios.get('/data-box/books')
}

export function getBooksByPage(page = 1) {
  return Axios.get('/books', {
    params: {
      page,
    }
  })
}

export function getBookByID(id: string) {
  return Axios.get(`/books/${id}`)
}

export function getBooksByPublisher(pid: string) {
  return Axios.get(`/books/publisher/${pid}`)
}

export function createBook({ name, author, category, isbn, publisherID, price }: CreateBookRequest) {
  return Axios.post('/books', {
    name,
    author,
    category,
    isbn,
    publisherID,
    price
  })
}

export function purchase({ bookID, quantity }: PurchaseRequest) {
  return Axios.patch('/books/purchase', {
    bookID,
    quantity
  })
}

export function deleteBookByID(id: string) {
  return Axios.delete('/books', {
    params: {
      id
    }
  })
}