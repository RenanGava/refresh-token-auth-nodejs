import dayjs from "dayjs"
import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { GenerateRefreshToken } from "../../provider/GenereteRefreshToken"


class RefreshTokenUserUseCase{
    async execute(refresh_token: string){
        const refreshToken = await client.refreshToken.findFirst({
            where:{
                id: refresh_token
            }
        })

        if(!refreshToken){
            throw new Error("Refresh token Invalid")
        }

        // aqui verificamos o tempo de expiração do nosso token.
        const refreshtoken_expired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

        const generateTokenProvider = new GenerateTokenProvider()
        const token = await generateTokenProvider.execute(refreshToken.userId)


        // se o token estiver expirado vamos criar outro
        // e retronar o novo refresh token
        // se não vamos retornar apenas o token
        if(refreshtoken_expired){

            await client.refreshToken.deleteMany({
                where:{
                    userId: refreshToken.userId
                }
            })


            const generateRefreshTokenProvider =  new GenerateRefreshToken()
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)
            return { token, refreshToken:newRefreshToken }
        }

        return { token }
    }
}

export { RefreshTokenUserUseCase }