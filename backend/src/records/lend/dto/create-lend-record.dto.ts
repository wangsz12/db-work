import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateLendRecordDto {
  @IsString()
  readonly bookID: string;

  @IsString()
  readonly cardID: string;

  @IsInt()
  @Min(1)
  @Max(3)
  readonly duration: number;
}
