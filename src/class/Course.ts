import { Activity, Materia, Prisma, Student, Trail } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"

export const course_inclusions = Prisma.validator<Prisma.CourseInclude>()({
    materias: { include: { prerequisites: true, requiredBy: true } },
    students: { include: { user: true } },
    trilhas: { include: { materias: true } },
})

export type CoursePrisma = Prisma.CourseGetPayload<{ include: typeof course_inclusions }>
export type CourseForm = Omit<WithoutFunctions<Course>, "id">
export type PartialCourse = Partial<Course> & { id: number }

export class Course {
    id: number
    name: string
    campus: string | ""
    totalPeriods: number
    totalHoursActivites: number
    matriz: number
    materias: Materia[]
    trilhas: Trail[]
    students: Student[]

    //init class
    constructor(coursePrisma?: CoursePrisma | PartialCourse) {
        this.id = 0
        this.name = ""
        this.campus = ""
        this.totalPeriods = 0.0
        this.totalHoursActivites = 0.0
        this.matriz = 0
        this.materias = []
        this.trilhas = []
        this.students = []

        if (coursePrisma) {
            this.load(coursePrisma)
        }
    }

    static async create(data: CourseForm) {
        try {
            const course_prisma = await prisma.course.create({
                data: {
                    name: data.name,
                    campus: data.campus,
                    totalPeriods: data.totalPeriods,
                    materias: data.materias ? { create: data.materias.map((materia) => ({ ...materia })) } : undefined,
                    trilhas: data.trilhas ? { create: data.trilhas.map((trilha) => ({ ...trilha })) } : undefined,
                    students: data.students ? { create: data.students.map((student) => ({ ...student })) } : undefined,
                },
                include: course_inclusions,
            })

            const course = new Course(course_prisma)
            return course
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao cadastrar curso")
        }
    }

    static async updateCourse(data: PartialCourse) {
        try {
            const course_prisma = await prisma.course.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    campus: data.campus,
                    matriz: data.matriz,
                    totalPeriods: data.totalPeriods,
                    totalHoursActivites: data.totalHoursActivites,
                },
                include: course_inclusions,
            })

            return new Course(course_prisma)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar Curso")
        }
    }

    load(data: CoursePrisma | PartialCourse) {
        this.id = data.id
        this.name = data.name || ""
        this.campus = data.campus || ""
        this.totalPeriods = data.totalPeriods || 0
        this.totalHoursActivites = data.totalHoursActivites || 0.0
        this.matriz = data.matriz || 0
        this.materias = (data as CoursePrisma).materias || []
        this.trilhas = (data as CoursePrisma).trilhas || []
        this.students = (data as CoursePrisma).students || []
    }
}