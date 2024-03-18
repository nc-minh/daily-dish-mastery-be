import { IsString, IsDefined, IsOptional, IsArray, IsBoolean } from 'class-validator';
import CookingInstructions from 'models/types/CookingInstructions';

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
