import { dbConnection } from '../../databaseConnection.js'
import { userSchema } from "../../schemas/user/index.js";

async function validateSignup(req, res, next){
    const user = req.body
    const {email} = user
    const validation = userSchema.validate(user)
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

export {validateSignup}