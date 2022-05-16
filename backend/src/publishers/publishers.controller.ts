import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    return trueReturn(await this.publishersService.findAll(page));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    return trueReturn(await this.publishersService.findOne(id));
  }

  @Post()
  async create(
    @Body() { name, contact, address }: CreatePublisherDto,
  ): Promise<ResponseData> {
    const res = await this.publishersService.create(name, contact, address);

    return res ? trueReturn() : falseReturn();
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<ResponseData> {
    const res = await this.publishersService.delete(id);

    return res ? trueReturn() : falseReturn();
  }
}
