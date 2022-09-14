import { IQuiz, ISubmission } from "../types";
import { NotAuthorizedError } from "./error";

export const ensureCanUpdateQuiz = (
  userId: string | undefined,
  quiz: IQuiz
) => {
  if (userId !== quiz.createdBy.toString()) {
    throw new NotAuthorizedError("User does not have access to update quiz");
  }

  if (quiz.isPublished){
    throw new NotAuthorizedError("Cannot update already published quiz")
  }
};

/**
 * Only the creator of the quiz or the user who submitted can access the submissions
 * to a quiz
 */
export const ensureAccessToSubmissions = (
  userId: string | undefined,
  quiz: IQuiz,
  submission?: ISubmission
) => {
  if (quiz.createdBy.toString() == userId) return
  if (submission?.userId?.toString() == userId) return

  throw new NotAuthorizedError("User does not have access to view submissions for this quiz")
};
