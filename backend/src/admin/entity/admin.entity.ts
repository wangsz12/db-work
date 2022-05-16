import { IsString, Length } from 'class-validator';

export class AdminEntity {
  constructor(id: string, name?: string, account?: string) {
    this.id = id;
    this.name = name;
    this.account = account;
  }

  @IsString()
  @Length(5)
  id: string;

  @IsString()
  name?: string;

  @IsString()
  account: string;
}
