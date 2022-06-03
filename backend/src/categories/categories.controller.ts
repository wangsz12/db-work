import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/types';
import { falseReturn, trueReturn } from 'src/utils';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(page = 1): Promise<ResponseData> {
    return trueReturn({
      total: await this.categoriesService.findTotalQuantity(),
      categories: await this.categoriesService.findAll(page),
    });
  }

  @Get('parent')
  async findAllParent(): Promise<ResponseData> {
    return trueReturn(await this.categoriesService.findAllParent());
  }

  @Post()
  async create(
    @Body() { id, name, parent }: CreateCategoryDto,
  ): Promise<ResponseData> {
    const res = await this.categoriesService.create(id, name, parent);

    return res ? trueReturn() : falseReturn();
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<ResponseData> {
    const res = await this.categoriesService.delete(id);

    return res ? trueReturn() : falseReturn();
  }
}
