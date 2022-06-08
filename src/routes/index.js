import { Router } from "express";
import { linkRouter } from "./links/index.js";
import { signupRouter } from "./signup/index.js";
import { signinRouter } from "./signin/index.js";
import { userRouter } from "./user/index.js";

const router = Router()
router.use(signupRouter)
router.use(signinRouter)
router.use(linkRouter)
router.use(userRouter)

export {router}