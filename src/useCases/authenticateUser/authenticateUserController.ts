import { Request, Response } from "express";
import { AuthenticatedUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body

        const authenticateUserUseCase = new AuthenticatedUserUseCase()

        const token = await authenticateUserUseCase.execute({ username, password })

        return response.json(token)
    }
}

export { AuthenticateUserController }