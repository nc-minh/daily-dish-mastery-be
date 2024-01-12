import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import Meal from 'models/types/Meal';

const FoodSchema = new Schema<Meal>(
  {
    name: { type: String, required: true },
    description: { type: String },
    foods: { type: [Schema.Types.ObjectId], ref: MODELS.food },
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

FoodSchema.index({ name: 1 });
FoodSchema.index({ created_by: 1 });

const FoodModel: Model<Meal> = model<Meal>(MODELS.meal, FoodSchema, MODELS.meal);
export default FoodModel;
