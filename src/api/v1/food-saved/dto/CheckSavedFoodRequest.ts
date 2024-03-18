import { IsString, IsDefined } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CheckSavedFoodRequest {
  @IsString()
  @IsDefined()
  foods_id: ObjectId;
}
