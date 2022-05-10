import { Injectable } from '@nestjs/common';
import { FindAllDto } from './dto/find-all.dto';
import { FineEntity } from './entity/fine.entity';
import { FinesDao } from './fines.dao';

@Injectable()
export class FinesService {
  constructor(private readonly finesDao: FinesDao) {}

  async findAll(page: number): Promise<FindAllDto> {
    return {
      total: await this.finesDao.findTotalQuantity(),
      fines: await this.finesDao.findAll(page),
    };
  }

  async findOne(id: string): Promise<FineEntity> {
    return await this.finesDao.findOneByID(id);
  }

  async findAllByCard(id: string): Promise<FineEntity[]> {
    return await this.finesDao.findAllByCard(id);
  }

  async create(
    adminID: string,
    lendID: string,
    amount: number,
  ): Promise<boolean> {
    if (await this.finesDao.checkExisted(lendID)) {
      throw new Error('该条记录已有罚款');
    }

    const fine = new FineEntity(
      await this.finesDao.findNextID(),
      adminID,
      new FineEntity(lendID),
      amount,
      false,
    );

    return await this.finesDao.create(fine);
  }

  calculateFine(from: Date): number {
    const days: number =
      (new Date().getTime() - from.getTime()) / (24 * 60 * 60 * 1000);
    return parseFloat((days * 0.1).toFixed(2));
  }

  async findAmountByLendID(lendID: string): Promise<number> {
    return await this.finesDao.findAmountByLendID(lendID);
  }

  async payFine(id: string): Promise<boolean> {
    const fine = await this.finesDao.findOneByID(id);
    if (fine.isPaid) {
      throw new Error('罚款已缴纳');
    }

    return await this.finesDao.update(id);
  }
}
