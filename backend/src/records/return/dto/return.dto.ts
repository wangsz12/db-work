import { IsString, Length } from 'class-validator';

export class ReturnDto {
  @IsString()
  @Length(5)
  readonly adminID: string;

  @IsString()
  @Length(8)
  readonly lendID: string;
}
