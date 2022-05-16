import { Controller, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async findRecentRecords(): Promise<ResponseData> {
    const res = await this.recordsService.findRecentRecords();

    return trueReturn(
      res.map((item, index) => ({
        key: String(index),
        ...item,
        book: {
          ...item.book,
          id: undefined,
        },
        date: dayjs(item.date).format('YYYY-MM-DD'),
        deadline: dayjs(item.deadline).format('YYYY-MM-DD'),
      })),
    );
  }
}
