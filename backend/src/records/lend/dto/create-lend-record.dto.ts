import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateLendRecordDto {
  @IsString()
  readonly cardID: string;

  @IsString()
  readonly bookID: string;

  @IsInt()
  @Min(1)
  @Max(3)
  readonly duration: number;
}
