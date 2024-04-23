import { Course, Prisma } from "@prisma/client"
import { courseIncludes } from "./Course"

export const materiaIncludes = Prisma.validator<Prisma.MateriaInclude>()({
    course: { include: courseIncludes },
    prerequisites: true,
    requiredBy: true,
})

export class Materia {
    id: number
    code: string
    name: string
    totalHours: number
    period: number

    course: Course
    courseId: number = 0

    // Relação muitos-para-muitos consigo mesmo para pré-requisitos
    prerequisites: Materia[] = []
    requiredBy: Materia[] = []

    constructor(id: number, course: Course, courseId: number = 0) {
        this.id = id
        this.code = ""
        this.name = ""
        this.totalHours = 0
        this.period = 0.0
        this.course = course
        this.courseId = courseId
    }
}
