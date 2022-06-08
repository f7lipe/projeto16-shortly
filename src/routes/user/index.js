import { Router } from "express";
import { getUserById } from "../../controllers/user/index.js";

const userRouter = Router()
userRouter.get('/users/:id', getUserById)

export{userRouter}