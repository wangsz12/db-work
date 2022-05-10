import { IsInt, Min } from 'class-validator';
import { ReturnRecordEntity } from '../entity/return-record.entity';

export class FindAllDto {
  @IsInt()
  @Min(0)
  total: number;

  records: ReturnRecordEntity[];
}
