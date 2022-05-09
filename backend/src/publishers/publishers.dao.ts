import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { PublisherEntity } from './entity/publisher.entity';

function DB2PublisherEntity(result: any[]): PublisherEntity[] {
  return result.map(
    ({ id, name, contact, address }) =>
      new PublisherEntity(id, name, contact, address),
  );
}

@Injectable()
export class PublishersDao {
  async fineAll(page: number): Promise<PublisherEntity[]> {
    const res = await executeSQL('SELECT * FROM publisher LIMIT ?,10', [
      10 * (page - 1),
    ]);

    return DB2PublisherEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM publisher');

    return res[0].res;
  }

  async findOne(id: string): Promise<PublisherEntity> {
    const res = await executeSQL('SELECT * FROM publisher WHERE id=?', [id]);

    return DB2PublisherEntity(res)[0];
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM publisher ORDER BY id DESC LIMIT 1',
    );
    if (last.length === 0) {
      return 'P0001';
    } else {
      return `P${('000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-4)}`;
    }
  }

  async create(publisher: PublisherEntity): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO publisher VALUES (?,?,?,?)', [
        publisher.id,
        publisher.name,
        publisher.contact,
        publisher.address,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
