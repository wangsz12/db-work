import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { ReaderCardEntity } from './entity/reader-card.entity';

function DB2ReaderCardEntity(result: any[]): ReaderCardEntity[] {
  return result.map(
    ({ card_id, name, gender, contact, address }) =>
      new ReaderCardEntity(card_id, name, gender, contact, address),
  );
}

@Injectable()
export class CardsDao {
  async findAll(page: number): Promise<ReaderCardEntity[]> {
    const res = await executeSQL('SELECT * FROM reader LIMIT ?,10', [
      10 * (page - 1),
    ]);

    return DB2ReaderCardEntity(res);
  }

  async findBorrowQuantity(cardID: string): Promise<number> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM lend_record WHERE lend_record.card_id=?',
      [cardID],
    );

    return res[0].res;
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS quantity FROM reader');

    return res[0].quantity;
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT card_id FROM reader ORDER BY card_id DESC LIMIT 1',
    );

    if (last.length === 0) {
      return 'C0000001';
    } else {
      return `C${('000000' + (parseInt(last[0].card_id.slice(1)) + 1)).slice(
        -7,
      )}`;
    }
  }

  async create(card: ReaderCardEntity): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO reader VALUES (?,?,?,?,?)', [
        card.id,
        card.name,
        card.gender,
        card.contact,
        card.address,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await executeSQL('DELETE FROM reader WHERE card_id=?', [id]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
