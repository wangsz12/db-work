interface APIResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any,
  readonly msg: string,
  readonly status: boolean
}

export interface Response {
  data: APIResult
}

export interface LendRecord {
  id: string,
  record: string,
  book: {
    id: string,
    name: string,
    author: string,
    isbn: string
  },
  date: string,
  duration: number,
  isOverdue: boolean,
  fine: number
}

export interface LendRequest {
  cardID: string,
  bookID: string,
  duration: number
}

export interface ReturnRequest {
  cardID: string,
  lendID: string
}

export interface FineRecord {
  id: string,
  record: string,
  book: {
    id: string,
    name: string,
    author: string,
    isbn: string
  },
  fine: number
}

export interface PayFineRequest {
  cardID: string,
  fineID: string
}

export interface CreateCardRequest {
  name: string,
  gender: number,
  contact: string,
  address: string
}

export interface BookListItem {
  id: string,
  record: string,
  name: string,
  author: string,
  isbn: string,
  price: number
}

export interface PurchaseRequest {
  bookID: string,
  price: number
}