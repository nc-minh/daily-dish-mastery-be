import { Document as MongooseDocument } from 'mongoose';
import User from './User';
import Food from './Food';

export default interface Meal extends MongooseDocument {
  name: string;
  description: string;
  cover_url?: string;
  foods?: Food[];
  created_at: Date;
  created_by: User;
  updated_at?: Date;
  updated_by?: User;
}
