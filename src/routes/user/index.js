import { Router } from "express";
import { getUserById, getRank } from "../../controllers/user/index.js";

const userRouter = Router()
userRouter.get('/users/:id', getUserById)
userRouter.get('/ranking', getRank)

export{userRouter}