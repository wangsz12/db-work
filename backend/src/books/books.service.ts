import { Injectable } from '@nestjs/common';
import { CategoriesDao } from 'src/categories/categories.dao';
import { PublisherEntity } from 'src/publishers/entity/publisher.entity';
import { BooksDao } from './books.dao';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksDao: BooksDao,
    private readonly categoryDao: CategoriesDao,
  ) {}

  async findAll(page: number): Promise<BookEntity[]> {
    return await this.booksDao.findAll(page);
  }

  async findTotalQuantity(): Promise<number> {
    return await this.booksDao.findTotalQuantity();
  }

  async findAllByPublisher(id: string): Promise<BookEntity[]> {
    return await this.booksDao.findAllByPublisher(id);
  }

  async findOne(id: string): Promise<BookEntity> {
    const res = await this.booksDao.findOneByID(id);

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
    categoryID: string,
    isbn: string,
    price: number,
  ): Promise<boolean> {
    const id = await this.booksDao.findNextID();
    const category = await this.categoryDao.findOneByID(categoryID);
    const book = new BookEntity(
      id,
      new PublisherEntity(publisherID),
      name,
      author,
      0,
      category,
      isbn,
      price,
    );
    const res = await this.booksDao.create(book);

    return res;
  }

  async purchase(id: string, quantity: number): Promise<boolean> {
    return await this.booksDao.update(id, quantity);
  }

  async delete(id: string): Promise<boolean> {
    return await this.booksDao.delete(id);
  }
}
