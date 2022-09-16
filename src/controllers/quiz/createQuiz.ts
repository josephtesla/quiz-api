import { WrapperArguments } from "../../helpers";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";
import { IQuestion } from "../../types";

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
