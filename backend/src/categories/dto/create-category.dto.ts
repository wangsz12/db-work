import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(1, 3)
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  parent: string | null;
}
