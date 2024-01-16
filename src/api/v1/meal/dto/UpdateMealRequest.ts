import { IsString, IsOptional, IsArray, IsDefined } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateMealRequest {
  @IsString()
  @IsOptional()
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

export class UpdateMealParams {
  @IsString()
  @IsDefined()
  id: string;
}
