import { IsString, IsDefined } from 'class-validator';

export class DeleteFoodParams {
  @IsString()
  @IsDefined()
  id: string;
}
