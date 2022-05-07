import { IsInt, Min } from 'class-validator';

export class BooksDto {
  @IsInt()
  @Min(0)
  readonly total: number;

  @IsInt()
  @Min(0)
  readonly lend: number;

  @IsInt()
  @Min(0)
  readonly categories: number;
}
