import { IsString, Length } from 'class-validator';

export class PublisherEntity {
  constructor(id: string, name?: string, contact?: string, address?: string) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.address = address;
  }

  @IsString()
  @Length(5)
  id: string;

  @IsString()
  name?: string;

  @IsString()
  contact?: string;

  @IsString()
  address?: string;
}
