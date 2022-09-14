//@ts-nocheck
import { Joi } from '../helpers'

export const createSubmissionSchemas = {
  inputSchema: Joi.object().keys({
    questionsWithAnswers: Joi.array().items(Joi.object().keys({
      questionId: Joi.objectId().required(),
      selectedAnswersIds: Joi.array().items(Joi.objectId()).required()
    })).required()
  }),

  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required()
  }),
}

export const getAllSubmissionsSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required()
  }),

  querySchema: Joi.object().keys({
    byCurrentUser: Joi.string().valid("1","0")
  }),
};

export const getSubmissionSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required()
  })
};
