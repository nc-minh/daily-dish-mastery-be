import { IsString, IsOptional, IsDefined } from 'class-validator';

export class UpdateCategoryRequest {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image_url: string;
}

export class UpdateCategoryParams {
  @IsString()
  @IsDefined()
  id: string;
}
