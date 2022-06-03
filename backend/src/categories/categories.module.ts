import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesDao } from './categories.dao';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDao],
})
export class CategoriesModule {}
