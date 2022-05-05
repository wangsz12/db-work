import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateBooksDto {
  @IsString()
  readonly publisherID: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly author: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;

  @IsString()
  readonly category: string;

  @IsString()
  readonly isbn: string;

  @IsNumber()
  @Min(0)
  readonly price: number;
}
