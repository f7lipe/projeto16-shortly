import { Router } from "express";
import { signup } from "./signup/index.js";

const router = Router()
router.use(signup)

export {router}