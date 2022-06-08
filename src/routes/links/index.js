import { createLink, getLinkById, getLinkAndOpen, deleteLink } from "../../controllers/link/index.js";
import { validateUrl } from "../../middleware/link/index.js";
import { validateToken } from "../../middleware/token/index.js";
import { Router } from "express";

const linkRouter = Router()
linkRouter.post('/urls/shorten', validateToken, validateUrl, createLink)
linkRouter.get('/urls/:id', getLinkById)
linkRouter.get('/urls/open/:shortUrl', getLinkAndOpen)
linkRouter.delete('/urls/:id', validateToken, deleteLink)

export {linkRouter}