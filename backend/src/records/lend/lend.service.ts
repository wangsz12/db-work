import { Injectable } from '@nestjs/common';
import { FindAllDto } from './dto/find-all.dto';
import { LendRecordEntity } from './entity/lend-record.entity';
import { LendDao } from './lend.dao';

@Injectable()
export class LendService {
  constructor(private readonly lendDao: LendDao) {}

  async findAll(page: number): Promise<FindAllDto> {
    return {
      total: await this.lendDao.findTotalQuantity(),
      records: await this.lendDao.findAll(page),
    };
  }

  async create(bookID: string, cardID: string, duration: number) {
    return await this.lendDao.create(
      await this.lendDao.findNextID(),
      bookID,
      cardID,
      duration,
    );
  }

  async findOneByID(id: string): Promise<LendRecordEntity> {
    return await this.lendDao.findOneByID(id);
  }

  async findAllByCard(id: string): Promise<LendRecordEntity[]> {
    return await this.lendDao.findAllByCard(id);
  }
}
