import { IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsString()
  account: string;

  @IsString()
  password: string;
}
