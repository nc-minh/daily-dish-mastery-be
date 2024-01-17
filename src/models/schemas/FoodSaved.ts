import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import FoodSaved from 'models/types/FoodSaved';

const FoodSavedSchema = new Schema<FoodSaved>(
  {
    foods_id: { type: Schema.Types.ObjectId, ref: MODELS.food, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

FoodSavedSchema.index({ foods_id: 1 });
FoodSavedSchema.index({ created_by: 1 });
FoodSavedSchema.index(
  { foods_id: 1, created_by: 1 },
  {
    unique: true,
  },
);

const FoodSavedModel: Model<FoodSaved> = model<FoodSaved>(MODELS.food_saved, FoodSavedSchema, MODELS.food_saved);
export default FoodSavedModel;
