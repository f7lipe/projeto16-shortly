import bcrypt from 'bcrypt'
import { dbConnection } from '../../databaseConnection.js'
import {v4 as uuid} from 'uuid'

async function createUser(req, res){
    const user = req.body
    const {name, email, password} = user
    try {
        const passwordHash = bcrypt.hashSync(password, 10);

        await dbConnection.query(`
                                  INSERT INTO 
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
        const {rows: users} = await dbConnection.query(`
                                               SELECT * from users u
                                               WHERE u.email = $1`, [email])
        const [user] = users
        if (!user) return res.sendStatus(401)

        const passwordValidation = bcrypt.compareSync(password, user.password)
        if(passwordValidation){
            const token = uuid()
            await dbConnection.query(`
                                      INSERT INTO sessions (token, "userId") 
                                      VALUES ($1, $2)`, [token, user.id])
            return res.send(token)
        }
        else return res.sendStatus(422)
    } catch (error) {
        res.sendStatus(422)
    }
}

async function getUserById(req, res){
    const {id} = req.params 


    try {
       const {rows: user} = await dbConnection.query(`
                                  SELECT u.id, u.name,
                                  SUM(l.views) as "visitCount"
                                  FROM users u
                                  LEFT JOIN links l ON l."userId"=u.id
                                  WHERE u.id=$1
                                  GROUP BY u.id`,[id])
        const {rows: shortenedUrls} = await dbConnection.query(
            `
            SELECT l.id, l."shortUrl", l.url, l.views as "visitCount"
            FROM links l
            WHERE l."userId" = $1
            ORDER BY l.views DESC`, [id]
        )

        res.status(200).send(
          {  ...user[0],
            "shortenedUrls": shortenedUrls
        }    
        )
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export {createUser, getUser, getUserById}