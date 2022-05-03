import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';

@Controller('books')
export class BooksController {
  @Get()
  findAll(@Query('page') page = 1): ResponseData {
    console.log('page: ', page);

    return trueReturn({
      books: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `B${('0000000' + (10 * page + index + 1)).slice(-7)}`,
          name: '图解HTTP',
          author: '[日]上野 宣',
          quantity: 10,
          category: '计算机/网络',
          publisher: '人民邮电出版社',
          isbn: '9798115351531',
        })),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseData {
    return trueReturn({
      id,
      name: '图解HTTP',
      author: '[日]上野 宣',
      isbn: '9798115351531',
      price: 75.26,
    });
  }

  @Post('purchase')
  create(@Body() { bookID, quantity }): ResponseData {
    return trueReturn();
  }
}
