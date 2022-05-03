import { IsNumber, IsString, Min } from 'class-validator';

export class CreateFineDto {
  @IsString()
  readonly cardID: string;

  @IsString()
  readonly adminID: string;

  @IsString()
  readonly bookID: string;

  @IsNumber()
  @Min(0)
  readonly amount: number;
}
