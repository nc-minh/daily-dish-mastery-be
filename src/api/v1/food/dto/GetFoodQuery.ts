import { IsString, IsDefined } from 'class-validator';

export class GetFoodQuery {
  @IsString()
  @IsDefined()
  category_id: string;
}
