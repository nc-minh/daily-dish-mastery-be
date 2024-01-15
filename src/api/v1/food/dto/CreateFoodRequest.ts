import { IsString, IsDefined, IsOptional, IsObject, IsArray } from 'class-validator';
import CookingInstructions from 'models/types/CookingInstructions';
import Ingredient from 'models/types/Ingredient';

export class CreateFoodRequest {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
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
