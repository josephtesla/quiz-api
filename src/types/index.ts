import { Types } from "mongoose";
import { SolutionTypes } from "../constants";


export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string
  updatedAt: string
}

export interface IQuiz {
  id: string
  title: string
  isPublished: boolean
  questions: IQuestion[]
  totalQuestions: number
  createdBy: Types.ObjectId
  updatedBy?: Types.ObjectId
  createdAt: string
  updatedAt: string
}

export interface IQuestion {
  id: string
  quizId: string
  text: string
  solutionType: SolutionTypes
  answers: IAnswer[]
  createdBy: Types.ObjectId
  updatedBy?: Types.ObjectId
  createdAt: string
  updatedAt: string
}

export interface IAnswer {
  id: string
  answerText: string
  isCorrect: boolean
}

export interface ISubmission {
  id: string
  userId: Types.ObjectId
  quizId: Types.ObjectId
  totalPercentScore: number
  analysis: {
    questionId: string
    selectedAnswers: string[]
    percentScore: number
  }[]
}
