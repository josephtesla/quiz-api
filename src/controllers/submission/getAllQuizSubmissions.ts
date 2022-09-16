import { ensureAccessToSubmissions, WrapperArguments } from "../../helpers";
import { NotFoundError } from "../../helpers/error";
import { Quiz } from "../../models/quiz";
import { Submission } from "../../models/submission";

export const getAllQuizSubmissions = async ({
  params,
  query,
  user,
}: WrapperArguments) => {
  const { quizId } = params;
  const { byCurrentUser } = query;

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("Quiz not found");
  }

  const filter = { quizId };
  if (byCurrentUser === "1") {
    Object.assign(filter, { userId: user?.id }); // get all submission by current user for this quiz
  } else {
    // else get all submissions for this quiz, ensure user is creator of quiz
    ensureAccessToSubmissions(user?.id, quiz);
  }

  const submissions = await Submission.find(filter)
    .populate("submittedByUser", "id name email")
    .populate("quizDetails");

  return submissions.map((sub) => {
    sub = sub.toObject();
    delete sub["analysis"];
    return sub;
  });
};
