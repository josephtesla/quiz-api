import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import { logger } from "./logger"
import { errorMiddleware } from "./middleware/errorMiddleware"
import { wrapController } from "./helpers"

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

app.get("/", wrapController(() => {
  return {
    "message": "done"
  }
}))

export default app;
