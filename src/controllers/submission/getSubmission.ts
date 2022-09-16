import { ensureAccessToSubmissions, WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Quiz } from "../../models/quiz";
import { Submission } from "../../models/submission";

export const getSubmission = async ({ params, user }: WrapperArguments) => {
  const { quizId, submissionId } = params;
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) throw new NotFoundError("Quiz not found");

  const submission = await Submission.findOne({ _id: submissionId, quizId })
    .populate("submittedByUser", "id name email")
    .populate("quizDetails");

  if (!submission) throw new NotFoundError("Submission not found");

  ensureAccessToSubmissions(user?.id, quiz, submission);
  return submission;
};
