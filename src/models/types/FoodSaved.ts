import { Document as MongooseDocument } from 'mongoose';
import User from './User';
import Food from './Food';

export default interface FoodSaved extends MongooseDocument {
  foods_id?: Food;
  created_at: Date;
  created_by: User;
  updated_at?: Date;
  updated_by?: User;
}
