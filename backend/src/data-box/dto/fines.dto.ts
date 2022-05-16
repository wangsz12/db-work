import { IsInt, Min } from 'class-validator';

export class FinesDto {
  @IsInt()
  @Min(0)
  total: number;

  @IsInt()
  @Min(0)
  unpaid: number;

  @IsInt()
  @Min(0)
  paid: number;
}
