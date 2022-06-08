import { createLink } from "../../controllers/link/index.js";
import { validateUrl } from "../../middleware/link/index.js";
import { validateToken } from "../../middleware/token/index.js";
import { Router } from "express";

const linkRouter = Router()
linkRouter.post('/urls/shorten', validateToken, validateUrl, createLink)

export {linkRouter}