import { WrapperArguments } from "../../helpers";
import { Submission } from "../../models/submission";

export const getAllUserSubmissions = async ({ user }: WrapperArguments) => {
  const submissions = await Submission.find({ userId: user?.id })
    .populate("submittedByUser", "id name email")
    .populate("quizDetails");

  return submissions.map((sub) => {
    sub = sub.toObject();
    delete sub["analysis"];
    return sub;
  });
};
