import { IsInt, Min } from 'class-validator';

export class IndexDto {
  @IsInt()
  @Min(0)
  readonly books: number;

  @IsInt()
  @Min(0)
  readonly readers: number;

  @IsInt()
  @Min(0)
  readonly lend: number;

  @IsInt()
  @Min(0)
  readonly unpaidFine: number;
}
