import { dbConnection } from "../../databaseConnection.js";

async function validateToken(req, res, next){
    const authorization  = req.headers.authorization
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Token não enviado")

    const { rows: sessions } = await dbConnection.query(`SELECT * 
                                                         FROM sessions 
                                                         WHERE token=$1`, [token])
    const [session] = sessions
    if (!session) return res.status(401).send("Sessão de usuário não encontrada")
    
    const { rows: users } = await dbConnection.query(`SELECT * 
                                                      FROM users 
                                                      WHERE id=$1`, [session.userId])
    const [user] = users
    if (!user) return res.status(401).send("Usuário não encontrado")

    res.locals.user = user
    next()
}

export {validateToken}