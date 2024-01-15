import { IsString, IsDefined } from 'class-validator';

export class DeleteCategoryParams {
  @IsString()
  @IsDefined()
  id: string;
}
