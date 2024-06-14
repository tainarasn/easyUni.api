import express, { Express, Request, Response } from "express"
import { Course, CoursePrisma, PartialCourse } from "../../class/Course"

const router = express.Router()

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
