import express, { Router } from "express";
import { login, signup } from "../controllers";
import { loginValidationSchemas, signUpValidationSchemas } from "../controllerSchemas";
import { wrapController } from "../helpers";

const router: Router = express.Router()

router.post("/signup", wrapController(signup, signUpValidationSchemas))
router.post("/login", wrapController(login, loginValidationSchemas))

export default router
