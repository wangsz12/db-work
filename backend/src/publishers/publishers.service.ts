import { Injectable } from '@nestjs/common';
import { FindAllDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';
import { PublisherEntity } from './entity/publisher.entity';
import { PublishersDao } from './publishers.dao';

@Injectable()
export class PublishersService {
  constructor(private readonly publisherDao: PublishersDao) {}

  async findAll(page: number): Promise<FindAllDto> {
    return {
      total: await this.publisherDao.findTotalQuantity(),
      publishers: await this.publisherDao.fineAll(page),
    };
  }

  async findOne(id: string): Promise<FindOneDto> {
    const res = await this.publisherDao.findOne(id);

    return {
      name: res.name,
    };
  }

  async create(
    name: string,
    contact: string,
    address: string,
  ): Promise<boolean> {
    const publisher = new PublisherEntity(
      await this.publisherDao.findNextID(),
      name,
      contact,
      address,
    );

    return await this.publisherDao.create(publisher);
  }

  async delete(id: string): Promise<boolean> {
    return await this.publisherDao.delete(id);
  }
}
