import { ensureCanUpdateQuiz, WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";

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
