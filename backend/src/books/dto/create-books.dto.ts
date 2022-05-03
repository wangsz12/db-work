import { IsInt, IsString, Min } from 'class-validator';

export class CreateBooksDto {
  @IsString()
  readonly bookID: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;
}
