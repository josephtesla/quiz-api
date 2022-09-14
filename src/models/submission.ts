import mongoose, { Schema, Types } from "mongoose";
import { modelTransformFn } from "../helpers";
import { ISubmission } from "../types";
import { AnswerSchema } from "./answer";

const QuestionAnswersSummary = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  selectedAnswers: [AnswerSchema],
  percentScore: {
    type: Number,
    max: [100, "The value of path `percentScore` exceeds the limit 100"],
  },
});

QuestionAnswersSummary.virtual("question", {
  ref: 'Question',
  localField: 'questionId',
  foreignField: '_id',
})

const submissionSchema = new Schema<ISubmission>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quizId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    totalPercentScore: {
      type: Number,
      max: [100, "The value of path `totalPercentScore` exceeds the limit 100"],
    },
    analysis: [QuestionAnswersSummary],
  },
  {
    timestamps: true,
    toJSON: {
      transform: modelTransformFn,
      virtuals: true,
    },
  }
);

submissionSchema.virtual("submittedByUser", {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
})

submissionSchema.virtual("quizDetails", {
  ref: 'Quiz',
  localField: 'quizId',
  foreignField: '_id',
})


export const Submission = mongoose.model<ISubmission>("Submission", submissionSchema);
