import { nanoid } from "nanoid";
import { dbConnection } from '../../databaseConnection.js'

async function createLink(req, res){
    const url = req.body
    const {id} = res.locals.user
    const shortUrl = nanoid(6)

    try {
        await dbConnection.query(`INSERT INTO links (url, "shortUrl", "userId")
                                  VALUES ($1, $2, $3)`, [url, shortUrl, id])
        res.status(201).send({"shortUrl": shortUrl})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export {createLink}