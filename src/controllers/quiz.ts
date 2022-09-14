import { ensureCanUpdateQuiz, WrapperArguments } from "../helpers";
import { NotFoundError } from "../helpers/error";
import { Question } from "../models/question";
import { Quiz } from "../models/quiz";
import { IQuestion } from "../types";

export const createQuiz = async ({ input, user }: WrapperArguments) => {
  const { title, questions } = input
  const quiz = new Quiz({
    title,
    questions: [],
    createdBy: user?.id
  })

  const session = await Quiz.startSession();
  session.withTransaction(async () => {
    questions.forEach(async ({ text, answers, solutionType }: IQuestion) => {
      const question = new Question({
        quizId: quiz.id,
        text, 
        answers, 
        solutionType
      })

      quiz.questions.push(question);
      await question.save({ session });
    });

    await quiz.save({ session });
  });

  session.endSession();
  return quiz
}

export const getAllQuizzes = async ({ query }: WrapperArguments) => {
  const { createdBy } = query
  const filter = {}
  if (createdBy){
    Object.assign(filter, { createdBy })
  }

  const quizzes = await Quiz.find(filter)
    .sort({ createdAt: -1 })
    .populate("createdBy", "id name email");

  return quizzes;
};

export const getQuiz = async ({ params }: WrapperArguments) => {
  const { quizId } = params
  const quiz = await Quiz.findOne({ _id: quizId })
    .populate("createdBy", "id name email")
    .populate("questions")
  
  if (quiz == null) {
    throw new NotFoundError("Quiz with the ID not found")
  }

  return quiz;
};

export const updateQuiz = async({ params, input, user }: WrapperArguments) => {
  const { quizId } = params
  const { title, isPublished } = input
  const quiz = await Quiz.findOne({ _id: quizId })
  if (quiz == null) {
    throw new NotFoundError("Quiz with the ID not found")
  }

  ensureCanUpdateQuiz(user?.id, quiz)
  quiz.set({
    title,
    isPublished
  })

  await quiz.save()
  return
}

export const deleteQuiz = async ({ params, user }: WrapperArguments) => {
  const { quizId } = params
  const quiz = await Quiz.findOne({ _id: quizId })
  if (quiz == null) {
    throw new NotFoundError("Quiz with the ID not found")
  }

  ensureCanUpdateQuiz(user?.id, quiz)

  // DB transaction to safely delete quiz and all its questions
  const session = await Quiz.startSession()
  await session.withTransaction(async () => {
    await Quiz.deleteOne({ _id: quizId }, { session })
    await Question.deleteMany({ quizId }, { session })
  })

  session.endSession()
  return
}
