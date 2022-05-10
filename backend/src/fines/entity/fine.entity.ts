import { IsBoolean, IsNumber, IsString, Length, Min } from 'class-validator';
import { LendRecordEntity } from 'src/records/lend/entity/lend-record.entity';

export class FineEntity {
  constructor(
    id: string,
    adminID?: string,
    lend?: LendRecordEntity,
    amount?: number,
    isPaid?: boolean,
    comment?: string,
  ) {
    this.id = id;
    this.adminID = adminID;
    this.lend = lend;
    this.amount = amount;
    this.isPaid = isPaid;
    this.comment = comment;
  }

  @IsString()
  @Length(6)
  id: string;

  @IsString()
  @Length(5)
  adminID?: string;

  lend?: LendRecordEntity;

  @IsNumber()
  @Min(0)
  amount?: number;

  @IsBoolean()
  isPaid?: boolean;

  @IsString()
  comment?: string;
}
