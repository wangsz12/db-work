import { IsInt, Min } from 'class-validator';
import { PublisherEntity } from '../entity/publisher.entity';

export class FindAllDto {
  @IsInt()
  @Min(0)
  readonly total: number;

  readonly publishers: PublisherEntity[];
}
