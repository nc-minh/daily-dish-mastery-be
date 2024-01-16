import { IsString, IsDefined } from 'class-validator';

export class UpdateFoodCommentRequest {
  @IsString()
  @IsDefined()
  content: string;
}

export class UpdateFoodCommentParams {
  @IsString()
  @IsDefined()
  id: string;
}
