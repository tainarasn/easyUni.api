import express, { Request, Response } from "express"
import { Activity, ActivityForm, PartialActivity } from "../../class/Activity"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
    const data = req.body as ActivityForm

    try {
        const activity = await Activity.create(data)
        res.json(activity)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao cadastrar matéria")
    }
})

router.get("/all", async (req: Request, res: Response) => {
    try {
        const activities = await Activity.list()
        res.json(activities)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao listar activitys")
    }
})

router.patch("/update", async (req: Request, res: Response) => {
    const data = req.body as PartialActivity

    try {
        const activity = await Activity.update(data)
        res.json(activity)
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})

router.get("/delete", async (req: Request, res: Response) => {
    const data = req.query.id as number | undefined

    try {
        if (data) {
            const activity = await Activity.delete(Number(data))
            res.json(activity)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Erro ao atualizar matéria")
    }
})

export default router
