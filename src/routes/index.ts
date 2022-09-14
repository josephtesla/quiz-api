import express, { Router } from "express";
import {
  createQuestion,
  createQuiz,
  createSubmission,
  deleteQuestion,
  deleteQuiz,
  getAllQuizSubmissions,
  getAllQuizzes,
  getQuestion,
  getQuiz,
  getSubmission,
  login,
  signup,
  updateQuestion,
  updateQuiz,
} from "../controllers";
import {
  createQuestionSchemas,
  deleteQuestionSchemas,
  getQuestionSchemas,
  loginSchemas,
  signUpSchemas,
  updateQuestionSchemas,
} from "../controllerSchemas";
import {
  createQuizSchemas,
  deleteQuizSchemas,
  getAllQuizzesSchemas,
  getQuizSchemas,
  updateQuizSchemas,
} from "../controllerSchemas/quiz";
import { wrapController } from "../helpers";
import { ensureAuthenticated } from "../middleware/ensureAunthenticated";

const router: Router = express.Router();

router.post("/signup", wrapController(signup, signUpSchemas));
router.post("/login", wrapController(login, loginSchemas));

router.use("/", ensureAuthenticated);

//Quiz
router.post("/quiz", wrapController(createQuiz, createQuizSchemas));
router.get("/quizzes", wrapController(getAllQuizzes, getAllQuizzesSchemas));
router.get("/quiz/:quizId", wrapController(getQuiz, getQuizSchemas));
router.patch("/quiz/:quizId", wrapController(updateQuiz, updateQuizSchemas));
router.delete("/quiz/:quizId", wrapController(deleteQuiz, deleteQuizSchemas));

//Question
router.post(
  "/quiz/:quizId/questions",
  wrapController(createQuestion, createQuestionSchemas)
);

router.get(
  "/quiz/:quizId/questions/:questionId",
  wrapController(getQuestion, getQuestionSchemas)
);

router.patch(
  "/quiz/:quizId/questions/:questionId",
  wrapController(updateQuestion, updateQuestionSchemas)
);

router.delete(
  "/quiz/:quizId/questions/:questionId",
  wrapController(deleteQuestion, deleteQuestionSchemas)
);

//Submission
router.post("/submissions", wrapController(createSubmission));
router.get("/submissions/:quizId", wrapController(getAllQuizSubmissions));
router.get("/submissions/:quizId/:submissionId", wrapController(getSubmission));

export default router;
