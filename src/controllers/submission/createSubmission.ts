import { WrapperArguments } from "../../helpers";
import { BadRequestError, NotFoundError } from "../../helpers/error";
import { Question } from "../../models/question";
import { Quiz } from "../../models/quiz";
import { Submission } from "../../models/submission";

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

  if (!quiz.isPublished) {
    throw new BadRequestError(
      "Cannot submit solutions. Quiz not yet published"
    );
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
