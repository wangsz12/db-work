import { IsInt, Min } from 'class-validator';

export class CardsDto {
  @IsInt()
  @Min(0)
  readonly total: number;

  @IsInt()
  @Min(0)
  readonly male: number;

  @IsInt()
  @Min(0)
  readonly female: number;
}
