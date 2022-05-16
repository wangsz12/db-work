import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { BookEntity } from 'src/books/entity/book.entity';
import { executeSQL } from 'src/utils/mysql';
import { RecordEntity } from './entity/record.entity';

function LendDB2RecordEntity(result: any[]): RecordEntity[] {
  return result.map(
    ({ book_id, name, author, card_id, date, duration }) =>
      new RecordEntity(
        '借出',
        new BookEntity(book_id, undefined, name, author),
        card_id,
        date,
        dayjs(date).add(duration, 'month').toDate(),
        dayjs() > dayjs(date).add(duration, 'month'),
      ),
  );
}

function ReturnDB2RecordEntity(result: any[]): RecordEntity[] {
  return result.map(
    ({ book_id, name, author, card_id, ldate, date, duration, is_overdue }) =>
      new RecordEntity(
        '归还',
        new BookEntity(book_id, undefined, name, author),
        card_id,
        date,
        dayjs(ldate).add(duration, 'month').toDate(),
        Boolean(is_overdue),
      ),
  );
}

@Injectable()
export class RecordsDao {
  async findAllLendRecords(): Promise<RecordEntity[]> {
    const res = await executeSQL(
      `
      SELECT lend_record.card_id, lend_record.date, lend_record.duration, lend_record.book_id, book.name, book.author
      FROM lend_record, book
      WHERE lend_record.book_id = book.id
      LIMIT 0,10
    `,
    );

    return LendDB2RecordEntity(res);
  }

  async findAllReturnRecords(): Promise<RecordEntity[]> {
    const res = await executeSQL(
      `
      SELECT return_record.date, return_record.is_overdue, lend_record.card_id, lend_record.date AS ldate, lend_record.duration, lend_record.book_id, book.name, book.author
      FROM return_record, lend_record, book
      WHERE return_record.lend_id = lend_record.id AND lend_record.book_id = book.id
      LIMIT 0,10
    `,
    );

    return ReturnDB2RecordEntity(res);
  }
}
