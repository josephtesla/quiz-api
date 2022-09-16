import { ensureCanUpdateQuiz, WrapperArguments } from "../../helpers";
import { NotAuthorizedError, NotFoundError } from "../../helpers/error";
import { Quiz } from "../../models/quiz";

export const updateQuiz = async({ params, input, user }: WrapperArguments) => {
  const { quizId } = params
  const { title, isPublished } = input
  const quiz = await Quiz.findOne({ _id: quizId })
  if (quiz == null) {
    throw new NotFoundError("Quiz with the ID not found")
  }

  if (quiz.isPublished){
    throw new NotAuthorizedError("Cannot update already published quiz")
  }

  ensureCanUpdateQuiz(user?.id, quiz)
  quiz.set({
    title,
    isPublished
  })

  await quiz.save()
  return
}
