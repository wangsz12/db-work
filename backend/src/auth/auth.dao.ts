import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { AdminEntity } from '../admin/entity/admin.entity';

function DB2AdminEntity(result: any[]): AdminEntity[] {
  return result.map(({ id, name }) => new AdminEntity(id, name));
}

@Injectable()
export class AuthDao {
  async login(
    account: string,
    password: string,
  ): Promise<AdminEntity | boolean> {
    const res = await executeSQL(
      'SELECT id,name FROM admin WHERE account=? AND password=?',
      [account, password],
    );

    return res.length ? DB2AdminEntity(res)[0] : false;
  }
}
