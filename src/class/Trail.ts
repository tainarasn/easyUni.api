import { Prisma, Materia } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"
import { Course } from "./Course"

export const trail_inclusions = Prisma.validator<Prisma.TrailInclude>()({
    materias: true,
    course: true,
})

export type TrailPrisma = Prisma.TrailGetPayload<{ include: typeof trail_inclusions }>
export type TrailForm = Omit<WithoutFunctions<Trail>, "id">
export type PartialTrail = Partial<Trail> & { id: number }

export class Trail {
    id: number
    code: string
    name: string | null
    materias: Materia[]
    course: Course | null
    courseId: number | null

    constructor(trailPrisma?: TrailPrisma | PartialTrail) {
        this.id = 0
        this.code = ""
        this.name = null
        this.materias = []
        this.courseId = null
        this.course = null

        if (trailPrisma) {
            this.load(trailPrisma)
        }
    }

    static async create(data: TrailForm) {
        try {
            const trail_prisma = await prisma.trail.create({
                data: {
                    name: data.name,
                    code: data.code,
                    courseId: data.courseId ? data.courseId : 0,
                    materias: {
                        connect: data.materias.map((materia) => ({
                            id: materia.id,
                        })),
                    },
                },
                include: trail_inclusions,
            })

            return new Trail(trail_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao cadastrar trilha")
        }
    }

    static async update(data: PartialTrail) {
        try {
            const trail_prisma = await prisma.trail.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    code: data.code,
                    courseId: data.courseId ? data.courseId : 0,
                    materias: {
                        connect: data.materias?.map((materia) => ({
                            id: materia.id,
                        })),
                    },
                },
                include: trail_inclusions,
            })

            return new Trail(trail_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar trilha")
        }
    }

    static async list() {
        try {
            const trails = await prisma.trail.findMany({ include: trail_inclusions })
            return trails
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao buscar todas as trilhas")
        }
    }

    static async delete(id: number) {
        try {
            const trail = await prisma.trail.delete({ where: { id } })
            return trail
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao deletar trilha")
        }
    }

    load(data: TrailPrisma | PartialTrail) {
        this.id = data.id
        this.code = data.code || ""
        this.name = data.name || null
        this.courseId = data.courseId || null
        this.materias = (data as TrailPrisma).materias || []
    }
}
