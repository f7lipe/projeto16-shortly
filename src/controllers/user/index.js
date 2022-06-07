import bcrypt from 'bcrypt'
import { dbConnection } from '../../databaseConnection.js'

async function createUser(req, res){
    const user = req.body
    const {name, email, password} = user

    try {
        const passwordHash = bcrypt.hashSync(password, 10);

        await dbConnection.query(`INSERT INTO 
                                  users(name, email, password) 
                                  VALUES ($1, $2, $3)`, [name, email, passwordHash])
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export {createUser}