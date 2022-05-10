import { IsInt, Min } from 'class-validator';
import { FineEntity } from '../entity/fine.entity';

export class FindAllDto {
  @IsInt()
  @Min(0)
  readonly total: number;

  readonly fines: FineEntity[];
}
