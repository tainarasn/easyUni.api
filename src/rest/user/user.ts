import express, { Express, Request, Response } from "express"
import { PartialUser, User, UserForm } from "../../class/User"
import { AddMateria } from "../../types/shared/addMateria"

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

router.get("/all", async (req: Request, res: Response) => {
    try {
        const course = await User.list()
        res.json(course)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao listar materias")
    }
})

router.get("/delete", async (req: Request, res: Response) => {
    const data = req.query.id as number | undefined

    try {
        if (data) {
            const course = await User.delete(Number(data))
            res.json(course)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})
router.post("/addMateria", async (req: Request, res: Response) => {
    const data = req.body as AddMateria

    try {
        if (data) {
            const course = await User.addMateria(data)
            res.json(course)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao associar matéria a estudante")
    }
})

export default router
