import { Document as MongooseDocument } from 'mongoose';
import User from './User';
import Category from './Category';

export default interface Food extends MongooseDocument {
  name: string;
  category_id: Category;
  description: string;
  cover_url?: string;
  view_count: number;
  is_approved: boolean;
  created_at: Date;
  created_by: User;
  updated_at?: Date;
  updated_by?: User;
}
