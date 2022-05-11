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
import { falseReturn, trueReturn } from 'src/utils';
import { CreateFineDto } from './dto/create-fine.dto';
import { UpdateFineDto } from './dto/update-fine.dto';
import { FinesService } from './fines.service';

@Controller('fines')
export class FinesController {
  constructor(private readonly finesService: FinesService) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    const { total, fines } = await this.finesService.findAll(page);
    return trueReturn({
      total,
      fines: fines.map((item) => ({
        id: item.id,
        cardID: item.lend.cardID,
        book: item.lend.book,
        amount: item.amount,
        paid: item.isPaid,
      })),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    const res = await this.finesService.findOne(id);

    return trueReturn({
      id: res.id,
      record: `${res.lend.book.name} / ${res.lend.book.author} / ￥${res.amount}`,
      book: res.lend.book,
      fine: res.amount,
    });
  }

  @Get('card/:id')
  async findAllByCard(@Param('id') id: string): Promise<ResponseData> {
    const res = await this.finesService.findAllByCard(id);
    return trueReturn(
      res.map(({ id, lend, amount }) => ({
        id: id,
        record: `${lend.book.name} / ${lend.book.author} / ￥${amount}`,
      })),
    );
  }

  @Post()
  async create(
    @Body() { adminID, lendID, amount }: CreateFineDto,
  ): Promise<ResponseData> {
    return this.finesService
      .create(adminID, lendID, amount)
      .then(() => trueReturn())
      .catch((err: Error) => falseReturn(null, err.message));
  }

  @Patch()
  async payFine(@Body() { id }: UpdateFineDto): Promise<ResponseData> {
    return this.finesService
      .payFine(id)
      .then(() => trueReturn())
      .catch((err: Error) => falseReturn(null, err.message));
  }
}
