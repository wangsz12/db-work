import { IsString } from 'class-validator';

export class CreateReturnRecordDto {
  @IsString()
  readonly cardID: string;

  @IsString()
  readonly lendID: string;
}
