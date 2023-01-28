import { Request, Response, Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { AuthenticateUserController } from './useCases/authenticateUser/authenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()


router.post("/users", createUserController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/refresh-token", refreshTokenUserController.handle)

router.get("/courses", ensureAuthenticated, (request:Request, response:Response) =>{
    return response.json([
        {id:1, name: "Nodejs"},
        {id:2, name: "Reactjs"},
        {id:3, name: "Elixir"},
        {id:4, name: "React-Native"},
        {id:5, name: "HTML"},
        {id:7, name: "Javascript"},
    ])
})


export { router }