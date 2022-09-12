import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import { logger } from "./logger"
import { errorMiddleware } from "./middleware/errorMiddleware"

const app = express()

declare global {
  namespace Express {
    export interface Request {
      state?: any
    }
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(errorMiddleware({ logger }))

export default app;
