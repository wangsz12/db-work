import {
  Body,
  Controller,
  Delete,
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
    const books = await this.booksService.findAll(page);

    return trueReturn({
      total: await this.booksService.findTotalQuantity(),
      books: books.map((item) => ({
        ...item,
        publisher: item.publisher.name,
        category: item.category.name,
      })),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    // if (!id.startsWith('B')) {
    //   return falseReturn(null, 'invalid id');
    // }

    return trueReturn(await this.booksService.findOne(id));
  }

  @Get('/publisher/:id')
  async findAllByPublisher(@Param('id') id: string): Promise<ResponseData> {
    const res = await this.booksService.findAllByPublisher(id);

    return trueReturn(
      res.map(({ id, name, author }) => ({
        id,
        record: `${name} / ${author}`,
      })),
    );
  }

  @Post()
  async create(
    @Body()
    { publisherID, name, author, category, isbn, price }: CreateBooksDto,
  ) {
    const res = await this.booksService.create(
      publisherID,
      name,
      author,
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

  @Delete()
  async delete(@Query('id') id: string): Promise<ResponseData> {
    const res = await this.booksService.delete(id);

    return res ? trueReturn() : falseReturn();
  }
}
