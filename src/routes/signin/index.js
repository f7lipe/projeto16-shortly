import { Router } from "express";
import { validateSignin } from "../../middleware/user/index.js";
import { getUser } from "../../controllers/user/index.js";

const signinRouter = Router()
signinRouter.post('/signin', validateSignin, getUser)

export {signinRouter}