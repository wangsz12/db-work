import { Controller, Get, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';

@Controller('records/return')
export class ReturnController {
  @Get()
  findAll(@Query('page') page = 1): ResponseData {
    return trueReturn({
      total: 235,
      records: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `R${('0000000' + (10 * page + index + 1)).slice(-7)}`,
          book: {
            id: 'B000001',
            name: '图解HTTP',
            author: '[日]上野 宣',
          },
          cardID: '1000001',
          date: '2022-04-28',
          isOverdue: Math.random() > 0.5,
          fine: 3.26,
          paid: Math.random() > 0.5,
        })),
    });
  }
}
