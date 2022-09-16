import { ensureCanUpdateQuiz, WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";

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
