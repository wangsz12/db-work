import { Injectable } from '@nestjs/common';
import { DataBoxDao } from './data-box.dao';
import { BooksDto } from './dto/books.dto';
import { CardsDto } from './dto/cards.dto';
import { FinesDto } from './dto/fines.dto';
import { IndexDto } from './dto/index.dto';
import { PublishersDto } from './dto/publishers.dto';

@Injectable()
export class DataBoxService {
  constructor(private readonly dataBoxDao: DataBoxDao) {}

  async findIndexDataBox(): Promise<IndexDto> {
    return {
      books: await this.dataBoxDao.findBooksQuantity(),
      readers: await this.dataBoxDao.findCardsQuantity(),
      lend: await this.dataBoxDao.findLendsQuantity(),
      unpaidFine: await this.dataBoxDao.findUnpaidQuantity(),
    };
  }

  async findBooksDataBox(): Promise<BooksDto> {
    return {
      total: await this.dataBoxDao.findBooksQuantity(),
      lend: await this.dataBoxDao.findLendsQuantity(),
      categories: await this.dataBoxDao.findCategoryQuantity(),
    };
  }

  async findCardsDataBox(): Promise<CardsDto> {
    const total: number = await this.dataBoxDao.findCardsQuantity();
    const male: number = await this.dataBoxDao.findMaleQuantity();

    return {
      total,
      male,
      female: total - male,
    };
  }

  async findFinesDataBox(): Promise<FinesDto> {
    const total: number = await this.dataBoxDao.findFinesQuantity();
    const unpaid: number = await this.dataBoxDao.findUnpaidQuantity();

    return {
      total,
      paid: total - unpaid,
      unpaid,
    };
  }

  async findPublishersDataBox(): Promise<PublishersDto> {
    return {
      total: await this.dataBoxDao.findPublisherQuantity(),
    };
  }
}
