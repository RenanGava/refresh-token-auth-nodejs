import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, password, username } = request.body

        const authenticateUserUseCase = new CreateUserUseCase()

        const user = await authenticateUserUseCase.execute({
            name,
            password,
            username
        })

        return response.json(user)
    }
}

export { CreateUserController }