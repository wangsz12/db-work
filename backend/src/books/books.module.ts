import { Module } from '@nestjs/common';
import { CategoriesDao } from 'src/categories/categories.dao';
import { BooksController } from './books.controller';
import { BooksDao } from './books.dao';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksDao, CategoriesDao],
})
export class BooksModule {}
