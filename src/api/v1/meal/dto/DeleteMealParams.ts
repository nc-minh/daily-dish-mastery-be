import { IsString, IsDefined } from 'class-validator';

export class DeleteMealParams {
  @IsString()
  @IsDefined()
  id: string;
}
