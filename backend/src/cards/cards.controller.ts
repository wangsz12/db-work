import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  @Get()
  findAll(@Query() page = 1): ResponseData {
    return trueReturn({
      total: 1536,
      cards: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `1${('0000000' + (10 * page + index + 1)).slice(-7)}`,
          name: '李华',
          gender: '男',
          contact: '13012345678',
          address: 'XX市XX区XX路XX小区',
          haveLent: 12,
        })),
    });
  }

  @Post()
  create(
    @Body() { name, gender, contact, address }: CreateCardDto,
  ): ResponseData {
    return trueReturn({
      id: 'R000001',
    });
  }

  @Delete()
  delete(@Query('id') id: string) {
    return trueReturn();
  }
}
