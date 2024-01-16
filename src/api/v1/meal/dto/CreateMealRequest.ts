import { IsString, IsDefined, IsOptional, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateMealRequest {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  cover_url: string;

  @IsArray()
  @IsOptional()
  foods: ObjectId[];
}
