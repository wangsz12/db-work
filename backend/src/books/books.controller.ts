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
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(@Query('page') page = 1): Promise<ResponseData> {
    return trueReturn({
      books: await this.booksService.findAll(page),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    if (!id.startsWith('B')) {
      return falseReturn(null, 'invalid id');
    }

    return trueReturn(await this.booksService.findOne(id));
  }

  @Post()
  async create(
    @Body()
    {
      publisherID,
      name,
      author,
      quantity,
      category,
      isbn,
      price,
    }: CreateBooksDto,
  ) {
    const res = await this.booksService.create(
      publisherID,
      name,
      author,
      quantity,
      category,
      isbn,
      price,
    );

    return res ? trueReturn() : falseReturn();
  }

  @Patch('purchase')
  async purchase(@Body() { bookID, quantity }): Promise<ResponseData> {
    const res = await this.booksService.purchase(bookID, quantity);
    return res ? trueReturn() : falseReturn();
  }
}
