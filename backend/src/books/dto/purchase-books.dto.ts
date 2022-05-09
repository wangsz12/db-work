import { IsInt, IsString, Length, Min } from 'class-validator';

export class PurchaseBooksDto {
  @IsString()
  @Length(8)
  readonly bookID: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;
}
