import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';

@Injectable()
export class DataBoxDao {
  async findBooksQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM book');

    return res[0].res;
  }

  async findCardsQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM reader');

    return res[0].res;
  }

  async findLendsQuantity(): Promise<number> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM lend_record WHERE is_returned=0',
    );

    return res[0].res;
  }

  async findFinesQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM fine_record');

    return res[0].res;
  }

  async findUnpaidQuantity(): Promise<number> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM fine_record WHERE is_paid=0',
    );

    return res[0].res;
  }

  async findCategoriesQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM category');

    return res[0].res;
  }

  async findMaleQuantity(): Promise<number> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM reader WHERE gender=0',
    );

    return res.length ? res[0].res : 0;
  }

  async findPublisherQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM publisher');

    return res[0].res;
  }

  async findAdminQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM admin');

    return res[0].res;
  }

  async findParentCategoriesQuantity(): Promise<number> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM category WHERE parent IS NULL',
    );

    return res[0].res;
  }
}
