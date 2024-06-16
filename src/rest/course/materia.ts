import express, { Request, Response } from "express"
import { Materia, MateriaForm, PartialMateria } from "../../class/Materia"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const data = req.body as MateriaForm

    try {
        const materia = await Materia.create(data)
        res.json(materia)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao cadastrar matéria")
    }
})

router.get("/all", async (req: Request, res: Response) => {
    try {
        const materias = await Materia.list()
        res.json(materias)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao listar materias")
    }
})

router.patch("/update", async (req: Request, res: Response) => {
    const data = req.body as PartialMateria

    try {
        const materia = await Materia.updateMateria(data)
        res.json(materia)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})

export default router
