import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import Category from 'models/types/Category';

const CategorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image_url: { type: String, default: '' },
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

CategorySchema.index({ name: 1 });
CategorySchema.index({ created_by: 1 });

const CategoryModel: Model<Category> = model<Category>(MODELS.category, CategorySchema, MODELS.category);
export default CategoryModel;
