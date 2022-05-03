import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(1)
  readonly gender: number;

  @IsString()
  @Length(11)
  readonly contact: string;

  @IsString()
  readonly address: string;
}
