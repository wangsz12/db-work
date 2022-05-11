import { IsInt, Min } from 'class-validator';
import { LendRecordEntity } from '../entity/lend-record.entity';

export class FindAllDto {
  @IsInt()
  @Min(0)
  total: number;

  records: LendRecordEntity[];
}
