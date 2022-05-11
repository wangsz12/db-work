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
    return trueReturn(await this.lendService.findAll(page));
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

    return trueReturn({
      ID,
      record: `${book.name} / ${book.author} / ${dayjs(date).format(
        'YYYY-MM-DD',
      )}`,
      book,
      date: dayjs(date).format('YYYY-MM-DD'),
      duration,
      isOverdue,
      fine: isOverdue ? await this.finesService.findAmountByLendID(ID) : 0,
    });
  }

  @Get('card/:id')
  async findOneByCard(@Param('id') id: string): Promise<ResponseData> {
    const res = await this.lendService.findAllByCard(id);

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
