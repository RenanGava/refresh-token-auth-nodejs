import { client } from "../../prisma/client"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from "../../provider/GenereteRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
// import * as dotenv from 'dotenv'
// dotenv.config()

interface IRequest {
    username: string
    password: string
}


class AuthenticatedUserUseCase {
    async execute({ password, username }: IRequest) {

        // verifica se o usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        // verificar se existe um token do usuário.
        const refreshTokenAlreadyExists = await client.refreshToken.findUnique({
            where:{
                userId: userAlreadyExists.id
            }
        })

        // se existir um refresh token não utilizado vamos apagar para
        // gerar outro após o login do usuário
        if(refreshTokenAlreadyExists){
            await client.refreshToken.deleteMany({
                where:{
                    id: refreshTokenAlreadyExists.id
                }
            })
        }
        

        if (!userAlreadyExists) {
            throw new Error("User or password incorrect! ")
        }

        // verifica se a senha está correta
        const passwordMatch = await compare(password, userAlreadyExists.password)

        if (!passwordMatch) {
            throw new Error("User or password incorrect! ")
        }

        

        // gerar o token de autenticação
        const generateTokenProvider = new GenerateTokenProvider
        const token = await generateTokenProvider.execute(userAlreadyExists.id)

        // aqui vamos criar o refresh_token
        const generateRefreshtoken = new GenerateRefreshToken()
        const refreshToken = await generateRefreshtoken.execute(userAlreadyExists.id)



        return { token, refreshToken }

    }
}

export { AuthenticatedUserUseCase }