import express, { Express, Request, Response } from "express"
import { LoginForm } from "../../types/shared/login"
import { User } from "../../class/User"
const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as LoginForm
    console.log(data)
    try {
        const user = await User.login(data)

        response.json(user)
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

export default router
