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

async function getLinkById(req, res){
    const {id} = req.params
    if(!id) return res.sendStatus(401)

    try {
       const {rows: links} = await dbConnection.query(`SELECT * from links l
                                                       WHERE l.id = $1`, [id])
        if (links.length === 0) return res.sendStatus(404)
        res.status(200).send(
            {
                id: links[0].id,
                shortUrl: links[0].shortUrl, 
                url: links[0].url
            }
        )
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getLinkAndOpen(req, res){
    const {shortUrl} = req.params

    try {
        const {rows: links} = await dbConnection.query(`SELECT * from links l
                                                        WHERE l."shortUrl" = $1`, [shortUrl])
         if (links.length === 0) return res.sendStatus(404)

        await dbConnection.query(`UPDATE links
                                  SET "views" = "views" + 1
                                  WHERE id = $1`, [links[0].id])

         const parseruRL = JSON.parse(links[0].url)
         res.redirect(parseruRL.url)
     } catch (error) {
         console.log(error)
         res.sendStatus(500)
     }
}


export {createLink, getLinkById, getLinkAndOpen}