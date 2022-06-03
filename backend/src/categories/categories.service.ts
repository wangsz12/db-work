import { Injectable } from '@nestjs/common';
import { CategoriesDao } from './categories.dao';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesDao: CategoriesDao) {}

  async findAll(page: number): Promise<CategoryEntity[]> {
    return await this.categoriesDao.findAll(page);
  }

  async findTotalQuantity(): Promise<number> {
    return await this.categoriesDao.findTotalQuantity();
  }

  async findAllParent(): Promise<string[]> {
    const res = await this.categoriesDao.findAllParent();

    return res.map(({ id, name }) => `${id} / ${name}`);
  }

  async create(id: string, name: string, parentID: string): Promise<boolean> {
    let parent = null;

    if (parentID) {
      parent = await this.categoriesDao.findOneByID(parentID);
    }

    const category = new CategoryEntity(id, name, parent);
    return await this.categoriesDao.create(category);
  }

  async delete(id: string): Promise<boolean> {
    return await this.categoriesDao.delete(id);
  }
}
