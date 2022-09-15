//@ts-nocheck
import { Joi } from "../helpers";
import { QUESTIONS_LIMIT, SolutionTypes } from "../constants";
import { createQuestionSchemas } from "./question";

export const createQuizSchemas = {
  inputSchema: Joi.object().keys({
    title: Joi.string().required(),
    questions: Joi.array()
      .items(createQuestionSchemas.inputSchema).max(QUESTIONS_LIMIT)
  }),
};

export const getAllQuizzesSchemas = {
  querySchema: Joi.object().keys({
    createdBy: Joi.objectId()
  }),
};

export const getQuizSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required()
  }),
};


export const updateQuizSchemas = {
  inputSchema: Joi.object().keys({
    title: Joi.string(),
    isPublished: Joi.boolean().valid(true)
  }),

  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required(),
  })
};

export const deleteQuizSchemas = {
  paramsSchema: Joi.object().keys({
    quizId: Joi.objectId().required(),
  }),
};
