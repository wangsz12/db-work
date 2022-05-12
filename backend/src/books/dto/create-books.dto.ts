import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateBooksDto {
  @IsString()
  @Length(5)
  readonly publisherID: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly category: string;

  @IsString()
  @Length(13)
  readonly isbn: string;

  @IsNumber()
  @Min(0)
  readonly price: number;
}
