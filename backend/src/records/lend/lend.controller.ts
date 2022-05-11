import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FinesService } from 'src/fines/fines.service';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { CreateLendRecordDto } from './dto/create-lend-record.dto';
import { LendService } from './lend.service';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Controller('records/lend')
export class LendController {
  constructor(
    private readonly lendService: LendService,
    private readonly finesService: FinesService,
  ) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    const { total, records } = await this.lendService.findAll(page);

    return trueReturn({
      total,
      records: records.map((item) => ({
        ...item,
        book: {
          ...item.book,
          isbn: undefined,
        },
        date: dayjs(item.date).format('YYYY-MM-DD'),
      })),
    });
  }

  @Post()
  async create(
    @Body() { bookID, cardID, duration }: CreateLendRecordDto,
  ): Promise<ResponseData> {
    const res = await this.lendService.create(bookID, cardID, duration);

    return res ? trueReturn() : falseReturn();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    const {
      id: ID,
      book,
      date,
      duration,
    } = await this.lendService.findOneByID(id);
    const ddl: Dayjs = dayjs(date).add(duration, 'month');
    const isOverdue = ddl < dayjs();
    let fine = 0;

    if (isOverdue) {
      fine = await this.finesService.findAmountByLendID(ID);
      if (fine === -1) {
        fine = this.finesService.calculateFine(ddl);
      }
    }

    return trueReturn({
      ID,
      record: `${book.name} / ${book.author} / ${dayjs(date).format(
        'YYYY-MM-DD',
      )}`,
      book,
      date: dayjs(date).format('YYYY-MM-DD'),
      duration,
      isOverdue,
      fine,
    });
  }

  @Get('card/:id')
  async findAllUnreturnedByCard(
    @Param('id') id: string,
  ): Promise<ResponseData> {
    const res = await this.lendService.findAllUnreturnedByCard(id);

    return trueReturn(
      res.map(({ id: ID, book, date }) => ({
        id: ID,
        record: `${book.name} / ${book.author} / ${dayjs(date).format(
          'YYYY-MM-DD',
        )}`,
      })),
    );
  }
}
