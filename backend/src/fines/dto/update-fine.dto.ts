import { IsString } from 'class-validator';

export class UpdateFineDto {
  @IsString()
  readonly id: string;
}
