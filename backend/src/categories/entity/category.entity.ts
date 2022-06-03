import { IsString, Length } from 'class-validator';

export class CategoryEntity {
  constructor(id: string, name?: string, parent?: CategoryEntity) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  @IsString()
  @Length(5)
  id: string;

  @IsString()
  name?: string;

  @IsString()
  parent?: CategoryEntity;
}
