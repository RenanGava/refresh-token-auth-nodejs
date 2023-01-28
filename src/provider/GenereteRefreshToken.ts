import { client } from "../prisma/client";
import dayjs from 'dayjs'



class GenerateRefreshToken{
    async execute(userId:string){

        // aqui utilizamos a lib dayjs para gerar um valor de 15 segundos
        // para a expiração do nosos token.
        const expiresIn = dayjs().add(15, "seconds").unix()

        const generateRefreshtoken = await client.refreshToken.create({
            data:{
                userId,
                expiresIn
            }
        })

        return generateRefreshtoken
    }
}

export { GenerateRefreshToken }