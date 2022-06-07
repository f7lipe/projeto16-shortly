import { dbConnection } from '../../databaseConnection.js'
import { signupSchema, signinSchema } from "../../schemas/user/index.js";

async function validateSignup(req, res, next){
    const user = req.body
    const {email} = user
    const validation = signupSchema.validate(user)
    if(validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))

    try {
        const existingUsers = await dbConnection.query( `SELECT * 
                                                         FROM users 
                                                         WHERE email=$1`, [email])
        if (existingUsers.rowCount > 0) return res.status(422).send("Usuário já existente.")
        next()
    } catch (error) {
        console.log('Problema ao consultar usuário: ', error)
    }
}


async function validateSignin(req, res, next){
    const userCredentials = req.body
    const validation = signinSchema.validate(userCredentials)
    if(validation.error) return res.status(422).send(validation.error.details.map(detail => detail.message))
    next()
}

export {validateSignup, validateSignin}