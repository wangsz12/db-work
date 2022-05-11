import {
  IsBoolean,
  IsDate,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { BookEntity } from 'src/books/entity/book.entity';

export class LendRecordEntity {
  constructor(
    id: string,
    book?: BookEntity,
    cardID?: string,
    date?: Date,
    duration?: number,
    isReturned?: boolean,
  ) {
    this.id = id;
    this.book = book;
    this.cardID = cardID;
    this.date = date;
    this.duration = duration;
    this.isReturned = isReturned ?? false;
  }

  @IsString()
  @Length(8)
  id: string;

  book?: BookEntity;

  @IsString()
  @Length(8)
  cardID?: string;

  @IsDate()
  date?: Date;

  @IsInt()
  @Min(1)
  @Max(3)
  duration?: number;

  @IsBoolean()
  isReturned?: boolean;
}
