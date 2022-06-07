import { Router } from "express";
import { validateSignup } from "../../middleware/user/index.js";
import { createUser } from "../../controllers/user/index.js";

const signupRouter = Router()
signupRouter.post('/signup', validateSignup, createUser)

export {signupRouter}