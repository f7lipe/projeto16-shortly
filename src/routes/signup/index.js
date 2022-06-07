import { Router } from "express";
import { validateSignup } from "../../middleware/user/index.js";
import { createUser } from "../../controllers/user/index.js";

const signup = Router()
signup.post('/signup', validateSignup, createUser)

export {signup}