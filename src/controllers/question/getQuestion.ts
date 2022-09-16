import { WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";

export const getQuestion = async ({ params }: WrapperArguments) => {
  const { quizId, questionId } = params;
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) throw new NotFoundError("Quiz not found");

  const question = await Question.findOne({ _id: questionId });
  if (!question) throw new NotFoundError("Question not found");

  return question;
};
