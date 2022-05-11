import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { DataBoxService } from './data-box.service';

@Controller('data-box')
export class DataBoxController {
  constructor(private readonly dataBoxService: DataBoxService) {}

  @Get('index')
  async findIndexDataBox(): Promise<ResponseData> {
    return trueReturn(await this.dataBoxService.findIndexDataBox());
  }

  @Get('books')
  async findBooksDataBox(): Promise<ResponseData> {
    return trueReturn(await this.dataBoxService.findBooksDataBox());
  }

  @Get('cards')
  async findCardsDataBox(): Promise<ResponseData> {
    return trueReturn(await this.dataBoxService.findCardsDataBox());
  }

  @Get('fines')
  async findFinesDataBox(): Promise<ResponseData> {
    return trueReturn(await this.dataBoxService.findFinesDataBox());
  }

  @Get('publishers')
  async findPublishersDataBox(): Promise<ResponseData> {
    return trueReturn(await this.dataBoxService.findPublishersDataBox());
  }
}
