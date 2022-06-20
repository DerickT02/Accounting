import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import AppRoutes from './routes/router.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


app.get('/app', (req, res) => {
    res.send('Hello database') 
})  

app.use('/app', AppRoutes)

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(process.env.PORT, (req,res) => {
    console.log('connected to db')
})