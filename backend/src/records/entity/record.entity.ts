import { IsBoolean, IsDate, IsString, Length } from 'class-validator';
import { BookEntity } from 'src/books/entity/book.entity';

export class RecordEntity {
  constructor(
    status: string,
    book: BookEntity,
    cardID: string,
    date: Date,
    deadline: Date,
    isOverdue: boolean,
  ) {
    this.status = status;
    this.book = book;
    this.cardID = cardID;
    this.date = date;
    this.deadline = deadline;
    this.isOverdue = isOverdue;
  }

  @IsString()
  status: string;

  book: BookEntity;

  @IsString()
  @Length(8)
  cardID: string;

  @IsDate()
  date: Date;

  @IsDate()
  deadline: Date;

  @IsBoolean()
  isOverdue: boolean;
}
