import express, { Express, Request, Response } from "express"
import { PartialUser, User, UserForm } from "../../class/User"

const router = express.Router()

router.patch("/update", async (request: Request, response: Response) => {
    const data = request.body as PartialUser
    console.log(data)
    try {
        const user = await User.update(data)
        response.json(user)
    } catch (error) {
        console.log(error)
        response.status(500).json(error)
    }
})

export default router
