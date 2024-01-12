import { Model, model, Schema } from 'mongoose';

import MODELS from 'constants/model';
import FoodComment from 'models/types/FoodComment';

const FoodCommentSchema = new Schema<FoodComment>(
  {
    content: { type: String, required: true },
    foods_id: { type: Schema.Types.ObjectId, ref: MODELS.food, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: MODELS.user, required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

FoodCommentSchema.index({ foods_id: 1 });
FoodCommentSchema.index({ created_by: 1 });

const FoodCommentModel: Model<FoodComment> = model<FoodComment>(
  MODELS.food_comment,
  FoodCommentSchema,
  MODELS.food_comment,
);
export default FoodCommentModel;
