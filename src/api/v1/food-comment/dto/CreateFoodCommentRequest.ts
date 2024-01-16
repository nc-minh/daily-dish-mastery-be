import { IsString, IsDefined } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFoodCommentRequest {
  @IsString()
  @IsDefined()
  content: string;

  @IsString()
  @IsDefined()
  foods_id: ObjectId;
}
