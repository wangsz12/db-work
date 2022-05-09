import { IsString } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  name: string;

  @IsString()
  readonly contact: string;

  @IsString()
  readonly address: string;
}
