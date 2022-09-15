# Quick start

1. Change to the root directory of the project.
2. Run `npm install`. This should install all dependencies.
4. Copy `.env.example` to `.env` and fill in the variables.
5. You NEED MongoDB replica set, If you don’t have them installed but have
   Docker and Docker-compose you can run `npm run infra` in the root.
6. Now run `npm run dev`. This should launch the server
7. Server is now running on `http://localhost:{PORT}`.

## API Endpoints
### Auth
- `POST /signup` Sign Up
- `POST /login` Log in

### Quiz
- `POST /quiz` creates a new quiz
- `GET /quizzes` Gets all quizzes
   can pass `?createdBy={:userId}` query to get all quizzes created by a user

- `GET /quiz/[:quizId]` Get Single quiz (with questions)
- `PATCH /quiz/[:quizId]` Updates a quiz
- `DELETE /quiz/[:quizId]` Deletes a quiz

### Questions
- `POST /quiz/[:quizId]/questions` Creates and Adds a question to a quiz
- `GET /quiz/[:quizId]/questions/[:questionId]` Gets a question
- `PATCH /quiz/[:quizId]/questions/[:questionId]` Updates a question
- `DELETE /quiz/[:quizId]/questions/[:questionId]` Deletes a question

### Submissions
- `POST /quiz/[:quizId]/submissions` Creates a submission for a quiz
- `GET /quiz/[:quizId]/submissions` Gets all submissions for a quiz
   can pass `?byCurrentUser=1` query to get all submissions of the current user for the quiz

- `GET /quiz/[:quizId]/submissions/[:submissionId]` Gets single submission details with breakdown/analysis


