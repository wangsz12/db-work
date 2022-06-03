import { Injectable } from '@nestjs/common';
import { executeSQL } from 'src/utils/mysql';
import { CategoryEntity } from './entity/category.entity';

function DB2CategoryEntity(result: any[]): CategoryEntity[] {
  return result.map(
    ({ id, name, parent }) => new CategoryEntity(id, name, parent),
  );
}

@Injectable()
export class CategoriesDao {
  async findAll(page: number): Promise<CategoryEntity[]> {
    const res = await executeSQL('SELECT * FROM category LIMIT ?,10', [
      10 * (page - 1),
    ]);

    return DB2CategoryEntity(
      await Promise.all(
        res.map(async ({ id, name, parent }) => {
          if (!parent) {
            return { id, name, parent };
          }

          const parentEntity = await executeSQL(
            'SELECT * FROM category WHERE id=?',
            [parent],
          );
          return {
            id,
            name,
            parent: DB2CategoryEntity(parentEntity)[0],
          };
        }),
      ),
    );
  }

  async findTotalQuantity(): Promise<number> {
    const res = await executeSQL('SELECT COUNT(*) AS res FROM category');

    return res[0].res;
  }

  async findAllParent(): Promise<CategoryEntity[]> {
    const res = await executeSQL(
      'SELECT id, name FROM category WHERE parent IS NULL',
    );

    return DB2CategoryEntity(res);
  }

  async findAllSub(): Promise<CategoryEntity[]> {
    const res = await executeSQL(
      'SELECT id, name FROM category WHERE parent IS NOT NULL',
    );

    return DB2CategoryEntity(res);
  }

  async findOneByID(id: string): Promise<CategoryEntity> {
    const res = await executeSQL('SELECT * FROM category WHERE id=?', [id]);

    return DB2CategoryEntity(res)[0];
  }

  async create(category: CategoryEntity): Promise<boolean> {
    try {
      await executeSQL('INSERT INTO category VALUES (?,?,?)', [
        category.id,
        category.name,
        category.parent?.id,
      ]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await executeSQL('DELETE FROM category WHERE id=?', [id]);
      return true;
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
  }
}
