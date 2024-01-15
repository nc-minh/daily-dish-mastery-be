import { IsString, IsOptional, IsObject, IsArray, IsDefined } from 'class-validator';
import CookingInstructions from 'models/types/CookingInstructions';
import Ingredient from 'models/types/Ingredient';

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

  @IsObject()
  @IsOptional()
  ingredient: Ingredient;

  @IsArray()
  @IsOptional()
  cooking_instructions: CookingInstructions[];
}

export class UpdateFoodParams {
  @IsString()
  @IsDefined()
  id: string;
}
