export class BookEntity {
  constructor(
    id: string,
    pid?: string,
    name?: string,
    author?: string,
    quantity?: number,
    category?: string,
    isbn?: string,
    price?: number,
  ) {
    this.id = id;
    this.publisherID = pid;
    this.name = name;
    this.author = author;
    this.quantity = quantity;
    this.category = category;
    this.isbn = isbn;
    this.price = price;
  }

  id: string;

  publisherID?: string;

  name?: string;

  author?: string;

  quantity?: number;

  category?: string;

  isbn?: string;

  price?: number;
}
