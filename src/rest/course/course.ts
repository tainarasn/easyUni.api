import express, { Express, Request, Response } from "express"
import { Course, CourseForm, CoursePrisma, PartialCourse } from "../../class/Course"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const data = req.body as CourseForm

    try {
        const course = await Course.create(data)
        res.json(course)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar Curso")
    }
})

router.get("/all", async (req: Request, res: Response) => {
    try {
        const materias = await Course.list()
        res.json(materias)
        console.log(materias[11])
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao listar materias")
    }
})
router.patch("/update", async (req: Request, res: Response) => {
    const data = req.body as PartialCourse

    try {
        const course = await Course.updateCourse(data)
        res.json(course)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar Curso")
    }
})

router.get("/delete", async (req: Request, res: Response) => {
    const data = req.query.id as number | undefined

    try {
        if (data) {
            const course = await Course.delete(Number(data))
            res.json(course)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})

export default router
