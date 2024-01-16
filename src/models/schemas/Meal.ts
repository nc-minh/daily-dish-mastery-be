import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import Meal from 'models/types/Meal';

const MealSchema = new Schema<Meal>(
  {
    name: { type: String, required: true },
    description: { type: String },
    cover_url: { type: String, default: '' },
    foods: [{ type: String, ref: MODELS.food }],
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

MealSchema.index({ name: 'text' });
MealSchema.index({ created_by: 1 });

const MealModel: Model<Meal> = model<Meal>(MODELS.meal, MealSchema, MODELS.meal);
export default MealModel;
