import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import { authSignInSchema, authSignUpSchema} from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(authSignUpSchema), authControllers.signup);

authRouter.post("/signin", isEmptyBody, validateBody(authSignInSchema), authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

export default authRouter;