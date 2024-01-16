import { IsString, IsDefined } from 'class-validator';

export class DeleteFoodCommentParams {
  @IsString()
  @IsDefined()
  id: string;
}
