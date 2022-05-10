import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { CreateLendRecordDto } from './dto/create-lend-record.dto';
import { LendService } from './lend.service';

@Controller('records/lend')
export class LendController {
  constructor(private readonly lendService: LendService) {}

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

    return trueReturn({
      ID,
      record: `${book.name} / ${book.author} / ${date
        .toISOString()
        .slice(0, 10)}`,
      book,
      date,
      duration: duration,
      isOverdue: true,
      fine: 30.26,
    });
  }

  @Get('card/:id')
  async findOneByCard(@Param('id') id: string): Promise<ResponseData> {
    const res = await this.lendService.findAllByCard(id);

    return trueReturn(
      res.map(({ id: ID, book, date }) => ({
        id: ID,
        record: `${book.name} / ${book.author} / ${date
          .toISOString()
          .slice(0, 10)}`,
      })),
    );
  }
}
