import { Document as MongooseDocument } from 'mongoose';
import User from './User';
import Category from './Category';
import Ingredient from './Ingredient';
import CookingInstructions from './CookingInstructions';

export default interface Food extends MongooseDocument {
  name: string;
  category_id: Category;
  description: string;
  cover_url?: string;
  view_count: number;
  is_approved: boolean;
  ingredient: Ingredient;
  cooking_instructions: CookingInstructions[];
  created_at: Date;
  created_by: User;
  updated_at?: Date;
  updated_by?: User;
}
