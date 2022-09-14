import mongoose, { Schema, Types } from "mongoose";
import { modelTransformFn } from "../helpers";
import { IQuiz } from "../types";

const schema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      require: true,
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    questions: [{
      type: Types.ObjectId,
      ref: 'Question'
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
    toJSON: {
      transform: modelTransformFn,
      virtuals: true
    },
  }
);

schema.virtual("totalQuestions").get(function(){
  return this.questions.length
})

export const Quiz = mongoose.model<IQuiz>("Quiz", schema);
