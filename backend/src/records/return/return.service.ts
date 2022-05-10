import { Injectable } from '@nestjs/common';
import { FinesService } from 'src/fines/fines.service';
import { LendDao } from '../lend/lend.dao';
import { FindAllDto } from './dto/find-all.dto';
import { ReturnDao } from './return.dao';

@Injectable()
export class ReturnService {
  constructor(
    private readonly returnDao: ReturnDao,
    private readonly lendDao: LendDao,
    private readonly finesService: FinesService,
  ) {}

  async findAll(page: number): Promise<FindAllDto> {
    return {
      total: await this.returnDao.findTotalQuantity(),
      records: await this.returnDao.findAll(page),
    };
  }

  async returnBook(lendID: string, adminID: string): Promise<boolean> {
    const lend = await this.lendDao.findOneByID(lendID);
    if (lend.isReturned) {
      throw new Error('该记录所借图书已归还');
    }

    try {
      await this.lendDao.updateIsReturned(lendID);

      const id: string = await this.returnDao.findNextID();
      const ddl: Date = lend.date;
      ddl.setMonth(ddl.getMonth() + lend.duration);
      const isOverdue: boolean = ddl < new Date();

      if (isOverdue) {
        await this.finesService.create(
          adminID,
          lendID,
          this.finesService.calculateFine(ddl),
        );
      }

      await this.returnDao.create(id, lendID, isOverdue);
      return true;
    } catch (err) {
      return false;
    }
  }
}
