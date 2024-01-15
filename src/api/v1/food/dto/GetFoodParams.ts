import { IsString, IsDefined } from 'class-validator';

export class GetFoodParams {
  @IsString()
  @IsDefined()
  id: string;
}
