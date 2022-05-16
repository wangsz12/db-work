import { Injectable } from '@nestjs/common';
import { AdminDao } from './admin.dao';
import { FindAllDto } from './dto/find-all.dto';
import { AdminEntity } from './entity/admin.entity';
import md5 = require('blueimp-md5');

@Injectable()
export class AdminService {
  constructor(private readonly adminDao: AdminDao) {}

  async findAll(page: number): Promise<FindAllDto> {
    return {
      total: await this.adminDao.findTotalQuantity(),
      admin: await this.adminDao.findAll(page),
    };
  }

  async delete(id: string): Promise<boolean> {
    return await this.adminDao.delete(id);
  }

  async create(name: string, account: string, pwd: string): Promise<string> {
    const id = await this.adminDao.findNextID();
    const admin = new AdminEntity(id, name, account);

    const existed = await this.adminDao.findExisted(account);
    if (existed) {
      throw new Error('该账号已被注册');
    }

    return await this.adminDao.create(admin, md5(md5(pwd)));
  }

  async updatePwd(id: string, prev: string, newPwd: string): Promise<boolean> {
    prev = md5(md5(prev));
    newPwd = md5(md5(newPwd));

    const pwd = await this.adminDao.findPwdByID(id);
    if (pwd !== prev) {
      throw new Error('旧密码不正确');
    }

    return await this.adminDao.update(id, newPwd);
  }
}
