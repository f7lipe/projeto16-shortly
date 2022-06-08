import bcrypt from 'bcrypt'
import { dbConnection } from '../../databaseConnection.js'
import {v4 as uuid} from 'uuid'

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

async function getUser(req, res){
    const {email, password} = req.body
    try {
        const {rows: users} = await dbConnection.query(`SELECT * from users u
                                               WHERE u.email = $1`, [email])
        const [user] = users
        if (!user) return res.sendStatus(401)

        const passwordValidation = bcrypt.compareSync(password, user.password)
        if(passwordValidation){
            const token = uuid()
            await dbConnection.query(`INSERT INTO sessions (token, "userId") 
                                      VALUES ($1, $2)`, [token, user.id])
            return res.send(token)
        }
        else return res.sendStatus(422)
    } catch (error) {
        res.sendStatus(422)
    }
}

export {createUser, getUser}