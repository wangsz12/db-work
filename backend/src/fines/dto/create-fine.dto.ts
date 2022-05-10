import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateFineDto {
  @IsString()
  @Length(5)
  readonly adminID: string;

  @IsString()
  @Length(8)
  readonly lendID: string;

  @IsNumber()
  @Min(0)
  readonly amount: number;
}
