// import express, { Express, Request, Response } from "express"
// import { PartialUser, User, } from "../../class/User"
// import { prisma } from "../../prisma"
// import axios from "axios"

// const router = express.Router()

// router.get("/", async (request: Request, response: Response) => {
//     const id = request.query.id as number

//     try {
//         const user = new User(id)
//         await user.init()
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })

// router.patch("/", async (request: Request, response: Response) => {
//     const data = request.body as PartialUser
//     console.log(data)
//     try {
//         const user = new User(data.id)
//         await user.init()
//         await user.updateUser(data)
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.status(500).json(error)
//     }
// })

// router.delete("/", async (request: Request, response: Response) => {
//     const data = request.body as { id: number }

//     try {
//         await prisma.user.delete({ where: { id: data.id } })
//         response.status(200).send()
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })

// export default router
