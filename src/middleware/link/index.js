import { urlSchema } from "../../schemas/link/index.js";

function validateUrl(req, res, next){
    const url = req.body
    const validation = urlSchema.validate(url)
    if (validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))

    next()
}

export {validateUrl}