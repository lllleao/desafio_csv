import express from "express";
import dotenv from 'dotenv'
import dataProcessing from '@src/controller/dataProcessing'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.static('src/public'))

const PORT = process.env.PORT

app.use('/', dataProcessing)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
}).on("error", (error) => {
    throw new Error(error.message)
})

export default app
