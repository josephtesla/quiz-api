import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import { logger } from "./logger"
import { errorMiddleware } from "./middleware/errorMiddleware"
import { IUser } from "./types"
import { currentUserMiddleware } from "./middleware/currentUserMiddleware"
import { Config } from "./config"
import routes from './routes'

const app = express()

declare global {
  namespace Express {
    export interface Request {
      user?: IUser | null | undefined
    }
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(currentUserMiddleware({ tokenSecret: Config.JWT_SECRET }))

app.use("/", routes)

app.use(errorMiddleware({ logger }))

export default app;
