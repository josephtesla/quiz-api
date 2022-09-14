import { ensureAccessToSubmissions, WrapperArguments } from "../helpers";
import { BadRequestError, NotFoundError } from "../helpers/error";
import { Question } from "../models/question";
import { Quiz } from "../models/quiz";
import { Submission } from "../models/submission";

export const createSubmission = async ({
  input,
  params,
  user,
}: WrapperArguments) => {
  const { quizId } = params;
  const userId = user?.id as string;
  const { questionsWithAnswers } = input;

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) throw new NotFoundError("Quiz not found");

  if (!quiz.isPublished){
    throw new BadRequestError("Cannot submit solutions. Quiz not yet published")
  }

  // build analysis
  let percentScoreSum = 0;
  let totalPercentScore = 0;
  let analysis = [];
  for (const questionWithAnswers of questionsWithAnswers) {
    const { questionId, selectedAnswersIds } = questionWithAnswers;
    const question = await Question.findOne({ _id: questionId }).select(
      "+answers.isCorrect"
    );

    if (!question) continue;
    const correctAnswers = question.answers
      .filter((ans) => ans.isCorrect)
      .map((ans) => ans.id);
    const incorrectAnswers = question.answers
      .filter((ans) => !ans.isCorrect)
      .map((ans) => ans.id);
    const totalCorrectAnswers = correctAnswers.length;
    const totalIncorrectAnswers = incorrectAnswers.length;
    let totalFractionScore = 0;
    let percentScore = 0;
    for (const answerId of selectedAnswersIds) {
      if (correctAnswers.includes(answerId)) {
        totalFractionScore += 1 / totalCorrectAnswers;
      } else if (incorrectAnswers.includes(answerId)) {
        totalFractionScore -= 1 / totalIncorrectAnswers;
      }
      // else the answerId given was not part of the question so we can ignore that
    }

    percentScore = Math.round(totalFractionScore * 100);
    percentScoreSum += percentScore;

    const questionAnswersSummary = {
      questionId,
      percentScore,
      selectedAnswers: question.answers.filter((ans) =>
        selectedAnswersIds.includes(ans.id)
      ),
    };

    analysis.push(questionAnswersSummary);
  }

  totalPercentScore = Math.round(percentScoreSum / quiz.totalQuestions);
  const submission = new Submission({
    userId,
    quizId,
    totalPercentScore,
    analysis,
  });

  await submission.save();
  return submission;
};

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
    .populate("quizDetails")

  return submissions.map(sub => {
    sub = sub.toObject()
    delete sub['analysis']
    return sub
  })
};

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
