import { IsInt, Min } from 'class-validator';

export class CategoriesDto {
  @IsInt()
  @Min(0)
  total: number;

  @IsInt()
  @Min(0)
  parents: number;
}
