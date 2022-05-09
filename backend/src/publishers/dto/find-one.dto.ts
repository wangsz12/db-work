import { IsString } from 'class-validator';

export class FindOneDto {
  @IsString()
  readonly name: string;
}
