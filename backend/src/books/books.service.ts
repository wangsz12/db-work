import { Injectable } from '@nestjs/common';
import { BooksDao } from './books.dao';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksDao: BooksDao) {}

  async findAll(page: number): Promise<BookEntity[]> {
    const res = await this.booksDao.findAll(page);

    return res.map(
      ({ id, name, author, quantity, category, isbn }) =>
        new BookEntity(id, undefined, name, author, quantity, category, isbn),
    );
  }

  async findOne(id: string): Promise<BookEntity> {
    const res = await this.booksDao.fineOneByID(id);

    return res
      ? new BookEntity(
          res.id,
          undefined,
          res.name,
          res.author,
          undefined,
          undefined,
          res.isbn,
          res.price,
        )
      : null;
  }

  async create(
    publisherID: string,
    name: string,
    author: string,
    quantity: number,
    category: string,
    isbn: string,
    price: number,
  ): Promise<boolean> {
    const id = await this.booksDao.findNextID();
    const book = new BookEntity(
      id,
      publisherID,
      name,
      author,
      quantity,
      category,
      isbn,
      price,
    );
    const res = await this.booksDao.create(book);

    return res;
  }

  async purchase(bookID: string, quantity: number): Promise<boolean> {
    return this.booksDao.update(bookID, quantity);
  }
}
