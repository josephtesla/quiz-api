import { QUESTIONS_LIMIT } from "../constants";
import { ensureCanUpdateQuiz, WrapperArguments } from "../helpers";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../helpers/error";
import { Question } from "../models/question";
import { Quiz } from "../models/quiz";

export const createQuestion = async ({
  input,
  params,
  user,
}: WrapperArguments) => {
  const { quizId } = params;
  const { text, answers, solutionType } = input;

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("Quiz not found");
  }

  if (quiz.isPublished){
    throw new NotAuthorizedError("Cannot update already published quiz")
  }

  ensureCanUpdateQuiz(user?.id, quiz);

  if (quiz.totalQuestions >= QUESTIONS_LIMIT){
    throw new BadRequestError("Limit for number of questions reached")
  }

  const question = new Question({
    quizId,
    text,
    answers,
    solutionType,
  });

  const session = await Quiz.startSession();
  await session.withTransaction(async () => {
    quiz.questions.push(question);
    await question.save({ session });
    await quiz.save({ session });
  });

  session.endSession();
  return question;
};

export const getQuestion = async ({ params }: WrapperArguments) => {
  const { quizId, questionId } = params;
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) throw new NotFoundError("Quiz not found");

  const question = await Question.findOne({ _id: questionId });
  if (!question) throw new NotFoundError("Question not found");

  return question;
};

export const updateQuestion = async({ params, input, user }: WrapperArguments) => {
  const { quizId, questionId } = params
  const { text, answers, solutionType } = input
  const quiz = await Quiz.findOne({ _id: quizId })
  if (quiz == null) {
    throw new NotFoundError("Quiz not found")
  }

  ensureCanUpdateQuiz(user?.id, quiz)
  const question = await Question.findOne({ _id: questionId });
  if (!question) throw new NotFoundError("Question not found");

  question.set({
    text: text ?? undefined,
    answers: answers ?? undefined,
    solutionType: solutionType ?? undefined
  })

  await question.save()
  return
}

export const deleteQuestion = async ({ params, user }: WrapperArguments) => {
  const { quizId, questionId } = params
  const quiz = await Quiz.findOne({ _id: quizId })
  if (quiz == null) {
    throw new NotFoundError("Quiz not found")
  }

  ensureCanUpdateQuiz(user?.id, quiz)
  const question = await Question.findOne({ _id: questionId });
  if (!question) throw new NotFoundError("Question not found");

  // DB transaction
  const session = await Quiz.startSession()
  await session.withTransaction(async () => {
    const updatedQuestions = quiz.questions.filter((qId) => qId != question.id)
    quiz.questions = updatedQuestions
    await quiz.save({ session })
    await Question.deleteOne({ _id: questionId }, { session })
  })

  session.endSession()
  return
}
