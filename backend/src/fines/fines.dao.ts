import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/books/entity/book.entity';
import { LendRecordEntity } from 'src/records/lend/entity/lend-record.entity';
import { executeSQL } from 'src/utils/mysql';
import { FineEntity } from './entity/fine.entity';

function DB2FineEntity(result: any[]): FineEntity[] {
  return result.map(
    ({
      id,
      admin_id,
      lend_id,
      amount,
      is_paid,
      comment,
      book_id,
      card_id,
      name,
      author,
      ISBN,
    }) => {
      return new FineEntity(
        id,
        admin_id,
        new LendRecordEntity(
          lend_id,
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
        ),
        amount,
        is_paid === 1,
        comment,
      );
    },
  );
}

@Injectable()
export class FinesDao {
  async findAll(page: number): Promise<FineEntity[]> {
    const res = await executeSQL(
      `
      SELECT fine_record.*, lend_record.book_id, lend_record.card_id, book.name, book.author, book.ISBN
      FROM fine_record, lend_record, book
      WHERE fine_record.lend_id = lend_record.id AND lend_record.book_id = book.id
      LIMIT ?,10
      `,
      [10 * (page - 1)],
    );

    return DB2FineEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM fine_record');

    return res[0].res;
  }

  async findOneByID(id: string): Promise<FineEntity> {
    const res = await executeSQL(
      `
      SELECT fine_record.*, lend_record.book_id, lend_record.card_id, book.name, book.author, book.ISBN
      FROM fine_record, lend_record, book
      WHERE fine_record.id = ? AND fine_record.lend_id = lend_record.id AND lend_record.book_id = book.id
      `,
      [id],
    );

    return DB2FineEntity(res)[0];
  }

  async findAllByCard(id: string): Promise<FineEntity[]> {
    const res = await executeSQL(
      `
      SELECT fine_record.id, lend_record.book_id, book.name, book.author, fine_record.amount
      FROM fine_record, lend_record, book
      WHERE lend_record.card_id = ? AND fine_record.lend_id = lend_record.id AND lend_record.book_id = book.id
      ORDER BY fine_record.id
      `,
      [id],
    );

    return DB2FineEntity(res);
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM fine_record ORDER BY id DESC LIMIT 1',
    );
    if (last.length === 0) {
      return 'F00001';
    } else {
      return `F${('0000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-5)}`;
    }
  }

  async checkExisted(lendID: string): Promise<boolean> {
    const res = await executeSQL(
      'SELECT * FROM fine_record WHERE lend_id = ?',
      [lendID],
    );

    return res.length as boolean;
  }

  async create(fine: FineEntity): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO fine_record VALUES(?,?,?,?,?,?)', [
        fine.id,
        fine.adminID,
        fine.lend.id,
        fine.amount,
        fine.isPaid ? 1 : 0,
        fine.comment,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }

  async update(id: string): Promise<boolean> {
    return executeSQL('UPDATE fine_record SET is_paid=1 WHERE id=?', [id])
      .then(() => true)
      .catch((err) => {
        console.log(err.sqlMessage);
        return false;
      });
  }

  async findAmountByLendID(lendID: string): Promise<number> {
    const res = await executeSQL(
      'SELECT amount FROM fine_record WHERE lend_id=?',
      [lendID],
    );

    return res[0].amount;
  }
}
