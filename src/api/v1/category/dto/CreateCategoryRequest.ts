import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateCategoryRequest {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image_url: string;
}
