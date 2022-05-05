import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    return trueReturn({
      total: await this.cardsService.findTotalQuantity(),
      cards: await this.cardsService.findAll(page),
    });
  }

  @Post()
  async create(
    @Body() { name, gender, contact, address }: CreateCardDto,
  ): Promise<ResponseData> {
    return trueReturn({
      id: await this.cardsService.create(name, gender, contact, address),
    });
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<ResponseData> {
    const res = await this.cardsService.delete(id);
    return res ? trueReturn() : falseReturn();
  }
}
