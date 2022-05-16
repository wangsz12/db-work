import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/books/entity/book.entity';
import { executeSQL } from 'src/utils/mysql';
import { LendRecordEntity } from './entity/lend-record.entity';

function DB2LendRecordEntity(result: any[]): LendRecordEntity[] {
  return result.map(
    ({
      id,
      book_id,
      name,
      author,
      ISBN,
      card_id,
      date,
      duration,
      is_returned,
    }) =>
      new LendRecordEntity(
        id,
        new BookEntity(
          book_id,
          undefined,
          name,
          author,
          undefined,
          undefined,
          ISBN,
        ),
        card_id,
        date,
        duration,
        is_returned,
      ),
  );
}

@Injectable()
export class LendDao {
  async findAll(page: number): Promise<LendRecordEntity[]> {
    const res = await executeSQL(
      `
      SELECT lend_record.*,book.name,book.author,book.ISBN
      FROM lend_record,book
      WHERE lend_record.book_id=book.id
      ORDER BY lend_record.id DESC
      LIMIT ?,10
      `,
      [10 * (page - 1)],
    );

    return DB2LendRecordEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM lend_record');

    return res[0].res;
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM lend_record ORDER BY id DESC LIMIT 1',
    );
    if (last.length === 0) {
      return 'L0000001';
    } else {
      return `L${('000000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-7)}`;
    }
  }

  async create(
    id: string,
    bookID: string,
    cardID: string,
    duration: number,
  ): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO lend_record VALUES (?,?,?,NOW(),?,0)', [
        id,
        bookID,
        cardID,
        duration,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }

  async findOneByID(id: string): Promise<LendRecordEntity> {
    const res = await executeSQL(
      `
      SELECT lend_record.*, book.name, book.author, book.ISBN
      FROM lend_record, book
      WHERE lend_record.id=? AND lend_record.book_id=book.id
      `,
      [id],
    );

    return DB2LendRecordEntity(res)[0];
  }

  async findAllUnreturnedByCard(id: string): Promise<LendRecordEntity[]> {
    const res = await executeSQL(
      `
      SELECT lend_record.id, lend_record.date, lend_record.book_id, book.name, book.author, lend_record.is_returned
      FROM lend_record, book
      WHERE lend_record.card_id=? AND lend_record.is_returned=0 AND lend_record.book_id=book.id
      ORDER BY lend_record.id
      `,
      [id],
    );

    return DB2LendRecordEntity(res);
  }

  async updateIsReturned(lendID: string): Promise<boolean> {
    try {
      await executeSQL('UPDATE lend_record SET is_returned=1 WHERE id=?', [
        lendID,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
