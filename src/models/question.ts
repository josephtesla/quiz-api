import mongoose, { Schema } from "mongoose";
import { SolutionTypes } from "../constants";
import { modelTransformFn } from "../helpers";
import { IQuestion } from "../types";
import { AnswerSchema } from "./answer";

const schema = new Schema<IQuestion>(
  {
    quizId: { type: String, required: true },
    text: {
      type: String,
      required: true,
    },
    solutionType: {
      type: String,
      default: SolutionTypes.SINGLE,
      enum: Object.values(SolutionTypes),
    },
    answers: [AnswerSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: modelTransformFn,
    },
  }
);

export const Question = mongoose.model<IQuestion>("Question", schema);
