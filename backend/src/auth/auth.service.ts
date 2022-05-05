import { Injectable } from '@nestjs/common';
import { AuthDao } from './auth.dao';

@Injectable()
export class AuthService {
  constructor(private readonly authDao: AuthDao) {}

  login(account: string, password: string) {
    return this.authDao.login(account, password);
  }
}
