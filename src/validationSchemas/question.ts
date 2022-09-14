//@ts-nocheck
import { Joi } from "../helpers";
import { SolutionTypes } from "../constants";

export const createQuestionSchemas = {
  inputSchema: Joi.object().keys({
    text: Joi.string().required(),
    solutionType: Joi.string().valid(...Object.values(SolutionTypes)).required(),
    answers: Joi.array().items(Joi.object().keys({
      answerText: Joi.string().required(),
      isCorrect: Joi.boolean().required()
    })).required()
  }),

  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required()
  })
}

export const updateQuestionSchemas = {
  inputSchema: Joi.object().keys({
    text: Joi.string(),
    solutionType: Joi.string().valid(...Object.values(SolutionTypes)),
    answers: Joi.array().items(Joi.object().keys({
      answerText: Joi.string().required(),
      isCorrect: Joi.boolean().required()
    }))
  }),

  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required(),
    questionId: Joi.objectId().required()
  })
}

export const deleteQuestionSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required(),
    questionId: Joi.objectId().required()
  })
}

export const getQuestionSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required(),
    questionId: Joi.objectId().required()
  })
}
