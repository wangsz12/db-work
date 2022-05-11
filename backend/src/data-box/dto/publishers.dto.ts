import { IsInt, Min } from 'class-validator';

export class PublishersDto {
  @IsInt()
  @Min(0)
  readonly total: number;
}
