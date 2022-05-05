import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksDao } from './books.dao';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksDao],
})
export class BooksModule {}
