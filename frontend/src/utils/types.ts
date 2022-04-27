interface APIResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any,
  readonly msg: string,
  readonly status: boolean
}

export interface Response {
  data: APIResult
}

export interface LendRequest {
  cardID: string,
  bookID: string,
  duration: number
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

export interface ReturnRequest {
  cardID: string,
  lendID: string
}