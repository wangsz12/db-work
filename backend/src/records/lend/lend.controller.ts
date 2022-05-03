import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { CreateLendRecordDto } from './dto/create-lend-record.dto';

@Controller('records/lend')
export class LendController {
  @Get()
  findAll(@Query('page') page = 1): ResponseData {
    return trueReturn({
      total: 476,
      records: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `L${('0000000' + (10 * page + index + 1)).slice(-7)}`,
          book: {
            id: 'b000001',
            name: '图解HTTP',
            author: '[日]上野 宣',
          },
          cardID: '1000001',
          date: '2022-04-26',
          duration: 2,
        })),
    });
  }

  @Post()
  create(
    @Body() { cardID, bookID, duration }: CreateLendRecordDto,
  ): ResponseData {
    return trueReturn();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseData {
    return trueReturn({
      id,
      record: '图解HTTP / [日]上野 宣 / 2022-04-26',
      book: {
        id: 'B000001',
        name: '图解HTTP',
        author: '[日]上野 宣',
        isbn: '9798115351531',
      },
      date: '2022-04-26',
      duration: 2,
      isOverdue: true,
      fine: 30.26,
    });
  }

  @Get('card/:id')
  findOneByCard(@Param('cardID') id: string): ResponseData {
    return trueReturn(
      Array(2)
        .fill('')
        .map((_, index) => ({
          id: String(index),
          record: '图解HTTP / [日]上野 宣 / 2022-04-26',
        })),
    );
  }
}
