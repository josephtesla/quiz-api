import { WrapperArguments } from "../../helpers";
import { Quiz } from "../../models/quiz";

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
