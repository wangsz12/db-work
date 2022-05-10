import { IsString, Length } from 'class-validator';

export class AdminEntity {
  constructor(id: string, name?: string) {
    this.id = id;
    this.name = name;
  }

  @IsString()
  @Length(5)
  id: string;

  @IsString()
  name?: string;
}
