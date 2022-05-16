import { Injectable } from '@nestjs/common';
import { AuthDao } from './auth.dao';
import { AdminEntity } from '../admin/entity/admin.entity';
import md5 = require('blueimp-md5');

@Injectable()
export class AuthService {
  constructor(private readonly authDao: AuthDao) {}

  async login(
    account: string,
    password: string,
  ): Promise<AdminEntity | boolean> {
    password = md5(md5(password));
    return await this.authDao.login(account, password);
  }
}
