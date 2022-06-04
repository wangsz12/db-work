import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { PublisherEntity } from 'src/publishers/entity/publisher.entity';
import { executeSQL } from 'src/utils/mysql';
import { BookEntity } from './entity/book.entity';

function DB2BookEntity(result: any[]): BookEntity[] {
  return result.map(
    ({
      id,
      publisher_id,
      pname,
      name,
      author,
      quantity,
      cid,
      cname,
      ISBN,
      price,
    }) =>
      new BookEntity(
        id,
        new PublisherEntity(publisher_id, pname),
        name,
        author,
        quantity,
        new CategoryEntity(cid, cname),
        ISBN,
        price,
      ),
  );
}

@Injectable()
export class BooksDao {
  async findAll(page: number): Promise<BookEntity[]> {
    const res = await executeSQL(
      `
      SELECT book.*, publisher.name AS pname, category.id AS cid, category.name AS cname
      FROM book, publisher, category
      WHERE book.publisher_id = publisher.id AND book.category = category.id
      ORDER BY book.id
      LIMIT ?,10
      `,
      [10 * (page - 1)],
    );

    return DB2BookEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM book');

    return res[0].res;
  }

  async findAllByPublisher(id: string): Promise<BookEntity[]> {
    const res = await executeSQL(
      'SELECT * FROM book WHERE publisher_id=? ORDER BY id',
      [id],
    );

    return DB2BookEntity(res);
  }

  async findOneByID(id: string): Promise<BookEntity> {
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

    if (last.length === 0) {
      return 'B0000001';
    } else {
      return `B${('000000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-7)}`;
    }
  }

  async create(book: BookEntity): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO book VALUES (?,?,?,?,?,?,?,?)', [
        book.id,
        book.publisher.id,
        book.name,
        book.author,
        book.quantity,
        book.category.id,
        book.isbn,
        book.price,
      ]);
      return true;
    } catch (err) {
      console.log('err: ', err.sqlMessage);
      return false;
    }
  }

  async update(bookID: string, quantity: number): Promise<boolean> {
    try {
      await executeSQL('UPDATE book SET quantity=quantity+? WHERE id=?', [
        quantity,
        bookID,
      ]);
      return true;
    } catch (err) {
      console.log('err: ', err.sqlMessage);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await executeSQL('DELETE FROM book WHERE id=?', [id]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
