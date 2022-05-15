import { IsString, Length } from 'class-validator';

export class UpdatePwdDto {
  @IsString()
  @Length(5)
  id: string;

  @IsString()
  @Length(32)
  prev: string;

  @IsString()
  @Length(32)
  newPwd: string;
}
