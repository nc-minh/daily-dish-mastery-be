import { IsString, IsDefined } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFoodSavedRequest {
  @IsString()
  @IsDefined()
  foods_id: ObjectId;
}
