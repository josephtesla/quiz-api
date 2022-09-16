import { ensureCanUpdateQuiz, WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";

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
