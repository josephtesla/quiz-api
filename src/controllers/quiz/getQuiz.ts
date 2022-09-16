import { WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Quiz } from "../../models/quiz";

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
