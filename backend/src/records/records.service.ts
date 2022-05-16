import { Injectable } from '@nestjs/common';
import { RecordEntity } from './entity/record.entity';
import { RecordsDao } from './records.dao';

@Injectable()
export class RecordsService {
  constructor(private readonly recordsDao: RecordsDao) {}

  async findRecentRecords(): Promise<RecordEntity[]> {
    const lends = await this.recordsDao.findAllLendRecords();
    const returns = await this.recordsDao.findAllReturnRecords();

    const merged = lends
      .concat(returns)
      .sort((a: RecordEntity, b: RecordEntity) => (a.date > b.date ? -1 : 1));

    return merged.slice(0, 10);
  }
}
