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

export default router
