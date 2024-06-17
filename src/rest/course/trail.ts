import express, { Express, Request, Response } from "express"
import { Course, CourseForm, CoursePrisma, PartialCourse } from "../../class/Course"
import { PartialTrail, Trail, TrailForm } from "../../class/Trail"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const data = req.body as TrailForm

    try {
        const trail = await Trail.create(data)
        res.json(trail)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar Curso")
    }
})

router.get("/all", async (req: Request, res: Response) => {
    try {
        const trails = await Trail.list()
        res.json(trails)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao listar materias")
    }
})
router.patch("/update", async (req: Request, res: Response) => {
    const data = req.body as PartialTrail

    try {
        const trail = await Trail.update(data)
        res.json(trail)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar Trilha")
    }
})

router.get("/delete", async (req: Request, res: Response) => {
    const data = req.query.id as number | undefined

    try {
        if (data) {
            const trail = await Trail.delete(Number(data))
            res.json(trail)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})

export default router
