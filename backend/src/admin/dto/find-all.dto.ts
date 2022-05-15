import { IsInt, Min } from 'class-validator';
import { AdminEntity } from '../entity/admin.entity';

export class FindAllDto {
  @IsInt()
  @Min(0)
  total: number;

  admin: AdminEntity[];
}
