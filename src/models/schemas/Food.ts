import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import Food from 'models/types/Food';
import CookingInstructions from 'models/types/CookingInstructions';

const FoodSchema = new Schema<Food>(
  {
    category_id: { type: Schema.Types.ObjectId, ref: MODELS.category },
    name: { type: String, required: true },
    description: { type: String },
    cover_url: { type: String, default: '' },
    view_count: { type: Number, default: 0 },
    is_approved: { type: Boolean, default: false },
    ingredient: { type: Object },
    cooking_instructions: Array<CookingInstructions>,
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

FoodSchema.index({ name: 1 });
FoodSchema.index({ created_by: 1 });
FoodSchema.index({ view_count: 1 });

const FoodModel: Model<Food> = model<Food>(MODELS.food, FoodSchema, MODELS.food);
export default FoodModel;
