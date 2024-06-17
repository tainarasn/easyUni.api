import { Prisma, Student } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"

export const activity_inclusions = Prisma.validator<Prisma.ActivityInclude>()({
    student: true,
})

export type ActivityPrisma = Prisma.ActivityGetPayload<{ include: typeof activity_inclusions }>
export type ActivityForm = Omit<WithoutFunctions<Activity>, "id"> & { studentId?: number }
export type PartialActivity = Partial<Activity> & { id: number }

export class Activity {
    id: number
    name: string
    totalHours: string
    linkCertificate?: string
    studentId?: number | null
    student: Student | null

    constructor(activityPrisma?: ActivityPrisma | PartialActivity) {
        this.id = 0
        this.name = ""
        this.totalHours = ""
        this.linkCertificate = ""
        this.student = null
        this.studentId = null

        if (activityPrisma) {
            this.load(activityPrisma)
        }
    }

    static async create(data: ActivityForm) {
        try {
            const activity_prisma = await prisma.activity.create({
                data: {
                    name: data.name,
                    totalHours: data.totalHours,
                    linkCertificate: data.linkCertificate,
                    studentId: data.studentId,
                },
                include: activity_inclusions,
            })

            return new Activity(activity_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao cadastrar atividade")
        }
    }

    static async update(data: PartialActivity) {
        try {
            const activity_prisma = await prisma.activity.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    totalHours: data.totalHours,
                    linkCertificate: data.linkCertificate,
                    studentId: data.studentId !== undefined ? data.studentId : undefined,
                },
                include: activity_inclusions,
            })

            return new Activity(activity_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar atividade")
        }
    }

    static async list() {
        try {
            const activities = await prisma.activity.findMany({ include: activity_inclusions })
            return activities.map((activity) => new Activity(activity))
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao buscar todas as atividades")
        }
    }

    static async delete(id: number) {
        try {
            const activity = await prisma.activity.delete({ where: { id } })
            return activity
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao deletar atividade")
        }
    }

    load(data: ActivityPrisma | PartialActivity) {
        this.id = data.id
        this.name = data.name || ""
        this.totalHours = data.totalHours || ""
        this.linkCertificate = data.linkCertificate || ""
        this.student = data.student || null
        this.studentId = data.studentId !== undefined ? data.studentId : null
    }
}
