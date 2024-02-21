import { IsString, IsOptional } from 'class-validator';

export class GetFoodQuery {
  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  is_approved: string;
}
