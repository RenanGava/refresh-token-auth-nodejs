import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { router } from './routes'
dotenv.config()

const app = express()

app.use(express.json())

app.use(router)

// middleware responsavel por tratar os erros da aplicação
app.use((error:Error, request:Request, response:Response, next:NextFunction) =>{
    return response.json({
        status: "Error ",
        message: error.message,
    })
})


app.listen(process.env.PORT, () =>{
    console.log("Servidor Rodando " + process.env.PORT + process.env.DATABASE_URL)
})