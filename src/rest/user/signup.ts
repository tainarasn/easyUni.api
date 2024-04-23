import express, { Express, Request, Response } from "express"
import { User } from "../../class/User"

const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as User
    console.log(data)
    const user = await User.signup(data)
    console.log(user)
    response.status(user instanceof User ? 200 : 400).json(user)
})

export default router
