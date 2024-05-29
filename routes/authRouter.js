import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { authSignInSchema, authSignUpSchema} from "../schemas/authSchemas.js";
import HttpError from "../helpers/HttpError.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(authSignUpSchema), authControllers.signup);
authRouter.post("/signin", isEmptyBody, validateBody(authSignInSchema), authControllers.signin);

export default authRouter;