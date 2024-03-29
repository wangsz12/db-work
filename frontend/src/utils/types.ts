interface APIResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any | any[],
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

export interface CreateBookRequest {
  name: string,
  author: string,
  category: string;
  isbn: string;
  publisherID: string;
  price: number;
}

export interface CreatePublisherRequest {
  name: string;
  contact: string;
  address: string;
}

export interface PurchaseRequest {
  bookID: string,
  quantity: number
}

export interface CreateAdminRequest {
  name: string;
  account: string;
  password: string;
}

export interface CreateCategoryRequest {
  id: string;
  name: string;
  parent: string;
}

export interface Category {
  id: string;
  name: string;
}