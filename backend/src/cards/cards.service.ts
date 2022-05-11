import { Injectable } from '@nestjs/common';
import { CardsDao } from './cards.dao';
import { ReaderCardEntity } from './entity/reader-card.entity';

@Injectable()
export class CardsService {
  constructor(private readonly cardsDao: CardsDao) {}

  async findAll(page: number): Promise<ReaderCardEntity[]> {
    return this.cardsDao.findAll(page);
  }

  async findTotalQuantity(): Promise<number> {
    return this.cardsDao.findTotalQuantity();
  }

  async create(
    name: string,
    gender: number,
    contact: string,
    address: string,
  ): Promise<string> {
    const id = await this.cardsDao.findNextID();
    const card = new ReaderCardEntity(id, name, gender, contact, address);
    const res = await this.cardsDao.create(card);

    return res ? id : '';
  }

  async delete(id: string): Promise<boolean> {
    return await this.cardsDao.delete(id);
  }
}
