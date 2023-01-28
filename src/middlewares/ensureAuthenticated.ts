import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'


export function ensureAuthenticated(request:Request, response:Response, next:NextFunction){
    const authToken = request.headers.authorization


    if(!authToken){
        return response.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token] = authToken.split(" ")

    try {
        // verificamos se o token é valido aqui
        verify(token, process.env.JWT_SECRET_KEY)

        //se for valido retornamos para o next para seguir com
        // as outras funções da rota

        return next()
    } catch (error) {
        return response.status(401).json({
            message: "Token invalid!"
        })
    }
}