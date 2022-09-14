// @ts-nocheck
import Joi from 'joi'
import joiObjectId from 'joi-objectid'

Joi.objectId = joiObjectId(Joi)

export { Joi }
