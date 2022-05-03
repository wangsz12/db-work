import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';

@Controller('publishers')
export class PublishersController {
  @Get()
  findAll(@Query('page') page = 1): ResponseData {
    return trueReturn({
      total: 52,
      publishers: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `P${('0000000' + (10 * page + index + 1)).slice(-7)}`,
          name: '人民邮电出版社',
          contact: '13012345678',
          address: 'XX市XX区XX路1号',
        })),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseData {
    return trueReturn({
      name: '人民邮电出版社',
    });
  }
}
