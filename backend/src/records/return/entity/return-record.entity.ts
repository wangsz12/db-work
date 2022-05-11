import { IsBoolean, IsDate, IsString, Length } from 'class-validator';
import { LendRecordEntity } from 'src/records/lend/entity/lend-record.entity';

export class ReturnRecordEntity {
  constructor(id: string, lend?: LendRecordEntity, isOverdue?: boolean) {
    this.id = id;
    this.lend = lend;
    this.isOverdue = isOverdue;
  }

  @IsString()
  @Length(8)
  id: string;

  lend?: LendRecordEntity;

  @IsDate()
  date: Date;

  @IsBoolean()
  isOverdue?: boolean;
}
