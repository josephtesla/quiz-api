import { Schema } from "mongoose";
import { modelTransformFn } from "../helpers";
import { IAnswer } from "../types";

export const AnswerSchema = new Schema<IAnswer>({
  answerText: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false,
    select: false
  }
},{
  toJSON: {
    transform: modelTransformFn
  }
})
