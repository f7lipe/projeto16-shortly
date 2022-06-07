import { router } from './routes/index.js'

import cors from 'cors'
import chalk from 'chalk'
import express, {json} from 'express'


const app = express()

app.use(cors())
app.use(json())
app.use(router)

const port = process.env.PORT || 4000
app.listen( port, ()=>{
    console.log(chalk.blueBright(`Server running on port ${port}`))
})

