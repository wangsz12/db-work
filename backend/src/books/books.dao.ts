import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { BookEntity } from './entity/book.entity';

function DB2BookEntity(result: any[]): BookEntity[] {
  return result.map(
    ({ id, publisher_id, name, author, quantity, category, ISBN, price }) =>
      new BookEntity(
        id,
        publisher_id,
        name,
        author,
        quantity,
        category,
        ISBN,
        price,
      ),
  );
}

@Injectable()
export class BooksDao {
  async findAll(page: number): Promise<BookEntity[]> {
    const res = await executeSQL('SELECT * FROM book LIMIT ?,10', [
      10 * (page - 1),
    ]);

    return DB2BookEntity(res);
  }

  async fineOneByID(id: string): Promise<BookEntity> {
    const res = await executeSQL('SELECT * FROM book WHERE id=?', [id]);

    return res ? DB2BookEntity(res)[0] : null;
  }

  async findOnePriceByID(id: string): Promise<number> {
    const res = await executeSQL('SELECT price FROM book WHERE id=?', [id]);

    return res[0].price;
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM book ORDER BY id DESC LIMIT 1',
    );
    const id = `B${('000000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-7)}`;

    return id;
  }

  async create(book: BookEntity): Promise<boolean> {
    return executeSQL('INSERT INTO book VALUES (?,?,?,?,?,?,?,?)', [
      book.id,
      book.publisherID,
      book.name,
      book.author,
      book.quantity,
      book.category,
      book.isbn,
      book.price,
    ])
      .then(() => true)
      .catch((err) => {
        console.log('err: ', err.sqlMessage);
        return false;
      });
  }

  async update(bookID: string, quantity: number): Promise<boolean> {
    return executeSQL('UPDATE book SET quantity=quantity+? WHERE id=?', [
      quantity,
      bookID,
    ])
      .then(() => true)
      .catch((err) => {
        console.log('err: ', err.sqlMessage);
        return false;
      });
  }
}
