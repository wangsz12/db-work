import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';

@Injectable()
export class AuthDao {
  async login(account: string, password: string): Promise<boolean> {
    const res = await executeSQL(
      'SELECT name FROM admin WHERE account=? AND password=?',
      [account, password],
    );

    return res.length ? res[0].name : null;
  }
}
