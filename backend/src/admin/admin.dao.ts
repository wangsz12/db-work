import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { AdminEntity } from './entity/admin.entity';

function DB2AdminEntity(result: any[]): AdminEntity[] {
  return result.map(
    ({ id, name, account }) => new AdminEntity(id, name, account),
  );
}

@Injectable()
export class AdminDao {
  async findAll(page: number): Promise<AdminEntity[]> {
    const res = await executeSQL('SELECT * FROM admin LIMIT ?,10', [
      10 * (page - 1),
    ]);

    return DB2AdminEntity(res);
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM admin');

    return res[0].res;
  }

  async findExisted(account: string): Promise<boolean> {
    const res = await executeSQL(
      'SELECT COUNT(*) AS res FROM admin WHERE account=?',
      [account],
    );

    return Boolean(res[0].res);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await executeSQL('DELETE FROM admin WHERE id=?', [id]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }

  async findNextID(): Promise<string> {
    const last = await executeSQL(
      'SELECT id FROM admin ORDER BY id DESC LIMIT 1',
    );

    if (last.length === 0) {
      return 'A0001';
    } else {
      return `A${('000' + (parseInt(last[0].id.slice(1)) + 1)).slice(-4)}`;
    }
  }

  async create(admin: AdminEntity, pwd: string): Promise<string> {
    try {
      await executeSQL('INSERT INTO admin VALUES (?,?,?,?)', [
        admin.id,
        admin.name,
        admin.account,
        pwd,
      ]);
      return admin.id;
    } catch (err) {
      console.log(err.sqlMessage);
      return '';
    }
  }

  async findPwdByID(id: string): Promise<string> {
    const res = await executeSQL('SELECT password FROM admin WHERE id=?', [id]);

    return res[0].password;
  }

  async update(id: string, pwd: string): Promise<boolean> {
    try {
      await executeSQL('UPDATE admin SET password=? WHERE id=?', [pwd, id]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
