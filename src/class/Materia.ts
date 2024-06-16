import { Prisma, Course, Trail, Student } from "@prisma/client"
import { prisma } from "../prisma"

export const materia_inclusions = Prisma.validator<Prisma.MateriaInclude>()({
    prerequisites: true,
    requiredBy: true,
    course: true,
    trilha: true,
    student: true,
})

export type MateriaPrisma = Prisma.MateriaGetPayload<{ include: typeof materia_inclusions }>
export type MateriaForm = Omit<Materia, "id">
export type PartialMateria = Partial<Materia> & { id: number }

export class Materia {
    id: number
    code: string
    name: string
    totalHours: number
    period: number
    periodRequire: number | null
    prerequisites: Materia[]
    requiredBy: Materia[]
    course: Course | null
    trilha: Trail
    student: Student | null

    constructor(materiaPrisma?: MateriaPrisma) {
        this.id = 0
        this.code = ""
        this.name = ""
        this.totalHours = 0
        this.period = 0
        this.periodRequire = null
        this.prerequisites = []
        this.requiredBy = []
        this.course = null
        this.trilha = {} as Trail
        this.student = null

        if (materiaPrisma) {
            this.load(materiaPrisma)
        }
    }

    static async create(data: MateriaForm) {
        try {
            const materia_prisma = await prisma.materia.create({
                data: {
                    code: data.code,
                    name: data.name,
                    totalHours: data.totalHours,
                    period: data.period,
                    periodRequire: data.periodRequire,
                    prerequisites: data.prerequisites
                        ? { connect: data.prerequisites.map((prerequisite) => ({ id: prerequisite.id })) }
                        : undefined,
                    requiredBy: data.requiredBy
                        ? { connect: data.requiredBy.map((required) => ({ id: required.id })) }
                        : undefined,
                    course: data.course ? { connect: { id: data.course.id } } : undefined,
                    trilha: data.trilha ? { connect: { id: data.trilha.id } } : undefined,
                    student: data.student ? { connect: { id: data.student.id } } : undefined,
                },
                include: materia_inclusions,
            })

            return new Materia(materia_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao cadastrar matéria")
        }
    }

    static async updateMateria(data: PartialMateria) {
        try {
            const materia_prisma = await prisma.materia.update({
                where: { id: data.id },
                data: {
                    code: data.code,
                    name: data.name,
                    totalHours: data.totalHours,
                    period: data.period,
                    periodRequire: data.periodRequire,
                    prerequisites: data.prerequisites
                        ? { connect: data.prerequisites.map((prerequisite) => ({ id: prerequisite.id })) }
                        : undefined,
                    requiredBy: data.requiredBy
                        ? { connect: data.requiredBy.map((required) => ({ id: required.id })) }
                        : undefined,
                    course: data.course ? { connect: { id: data.course.id } } : undefined,
                    trilha: data.trilha ? { connect: { id: data.trilha.id } } : undefined,
                },
                include: materia_inclusions,
            })

            return new Materia(materia_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar matéria")
        }
    }

    static async list() {
        try {
            const materias = await prisma.materia.findMany({ include: materia_inclusions })

            return materias
        } catch (error) {
            console.log(error)
            throw new Error("Error ao buscar todas as matérias")
        }
    }

    load(data: MateriaPrisma) {
        this.id = data.id
        this.code = data.code
        this.name = data.name
        this.totalHours = data.totalHours
        this.period = data.period
        this.periodRequire = data.periodRequire
        this.course = data.course
        this.student = data.student
    }
}
