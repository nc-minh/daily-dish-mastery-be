import { Document as MongooseDocument } from 'mongoose';
import User from './User';

export default interface Category extends MongooseDocument {
  name: string;
  description: string;
  image_url?: string;
  avatar_url?: string;
  created_at: Date;
  created_by: User;
  updated_at?: Date;
  updated_by?: User;
}
