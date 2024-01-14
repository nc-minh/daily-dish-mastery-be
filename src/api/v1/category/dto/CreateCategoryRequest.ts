import { IsString, IsDefined, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCategoryRequest {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsDefined()
  created_by: ObjectId;

  @IsString()
  @IsDefined()
  updated_by: ObjectId;
}
