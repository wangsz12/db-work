import { Injectable } from '@nestjs/common';
import { AuthDao } from './auth.dao';
import { AdminEntity } from './entity/admin.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authDao: AuthDao) {}

  async login(
    account: string,
    password: string,
  ): Promise<AdminEntity | boolean> {
    return await this.authDao.login(account, password);
  }
}
