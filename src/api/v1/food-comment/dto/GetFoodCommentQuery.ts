import { IsString, IsDefined } from 'class-validator';

export class GetFoodCommentQuery {
  @IsString()
  @IsDefined()
  foods_id: string;
}
