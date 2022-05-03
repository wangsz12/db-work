import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseData } from 'src/types';
import { trueReturn } from 'src/utils';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';

@Controller('fines')
export class FinesController {
  @Get()
  findAll(@Query('page') page = 1): ResponseData {
    return trueReturn({
      total: 67,
      fines: Array(10)
        .fill('')
        .map((_, index) => ({
          id: `f${('00000' + (10 * page + index + 1)).slice(-5)}`,
          cardID: '1000001',
          bookID: 'b0000001',
          name: '图解HTTP',
          author: '[日]上野 宣',
          amount: 3.27,
          paid: false,
        })),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseData {
    return trueReturn({
      id: 'F00001',
      record: '图解HTTP / [日]上野 宣 / ￥3.27',
      book: {
        id: 'b000001',
        name: '图解HTTP',
        author: '[日]上野 宣',
        isbn: '9798115351531',
      },
      fine: 3.27,
    });
  }

  @Get('card/:id')
  findOneByCard(@Param('id') id: string): ResponseData {
    return trueReturn(
      Array(2)
        .fill('')
        .map((_, index) => ({
          id: `F0000${index}`,
          record: '图解HTTP / [日]上野 宣 / ￥3.27',
        })),
    );
  }

  @Post()
  create(
    @Body() { cardID, adminID, bookID, amount }: CreateFineDto,
  ): ResponseData {
    return trueReturn();
  }

  @Patch()
  update(@Body() { id }: UpdateFineDto): ResponseData {
    return trueReturn();
  }
}
