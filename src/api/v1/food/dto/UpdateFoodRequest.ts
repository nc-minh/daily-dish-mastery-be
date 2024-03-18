import { IsString, IsOptional, IsArray, IsDefined, IsBoolean } from 'class-validator';
import CookingInstructions from 'models/types/CookingInstructions';

export class UpdateFoodRequest {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  cover_url: string;

  @IsArray()
  @IsOptional()
  ingredient: string[];

  @IsArray()
  @IsOptional()
  cooking_instructions: CookingInstructions[];

  @IsBoolean()
  @IsOptional()
  is_approved: string;
}

export class UpdateFoodParams {
  @IsString()
  @IsDefined()
  id: string;
}
