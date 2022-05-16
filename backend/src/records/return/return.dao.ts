import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/books/entity/book.entity';
import { executeSQL } from 'src/utils/mysql';
import { LendRecordEntity } from '../lend/entity/lend-record.entity';
import { ReturnRecordEntity } from './entity/return-record.entity';

function DB2ReturnRecordEntity(result: any[]): ReturnRecordEntity[] {
  return result.map(
    ({
      id,
      lend_id,
      is_overdue,
      book_id,
      card_id,
      date,
      duration,
      name,
      author,
    }) =>
      new ReturnRecordEntity(
        id,
        new LendRecordEntity(
          lend_id,
          new BookEntity(book_id, undefined, name, author),
          card_id,
          date,
          duration,
        ),
        is_overdue,
      ),
  );
}

@Injectable()
export class ReturnDao {
  async findAll(page: number): Promise<ReturnRecordEntity[]> {
    const res = await executeSQL(
      `
      SELECT return_record.*, lend_record.book_id, lend_record.card_id, lend_record.date, lend_record.duration, book.name, book.author
      FROM return_record, lend_record, book
      WHERE return_record.lend_id = lend_record.id AND lend_record.book_id = book.id
      ORDER BY id DESC
      LIMIT ?,10
      `,
      [10 * (page - 1)],
    );

    return DB2ReturnRecordEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM return_record');

    return res[0].res;
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM return_record ORDER BY id DESC LIMIT 1',
    );
    if (last.length === 0) {
      return 'R0000001';
    } else {
      return `R${('000000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-7)}`;
    }
  }

  async create(
    id: string,
    lendID: string,
    isOverdue: boolean,
  ): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO return_record VALUES (?,?,NOW(),?)', [
        id,
        lendID,
        isOverdue,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
