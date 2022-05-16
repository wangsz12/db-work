import { IsInt, Min } from 'class-validator';

export class AdminDto {
  @IsInt()
  @Min(0)
  total: number;
}
