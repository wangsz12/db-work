import { IsString, Length } from 'class-validator';

export class UpdateFineDto {
  @IsString()
  @Length(6)
  readonly id: string;
}
