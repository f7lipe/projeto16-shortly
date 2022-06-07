import { Router } from "express";
import { signupRouter } from "./signup/index.js";
import { signinRouter } from "./signin/index.js";

const router = Router()
router.use(signupRouter)
router.use(signinRouter)

export {router}