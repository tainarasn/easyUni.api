import { Materia, Prisma, User } from "@prisma/client"

export const courseIncludes = Prisma.validator<Prisma.CourseInclude>()({
    materias: { include: { prerequisites: true, requiredBy: true } },
})
export class Course {
    id: number
    name: string
    campus: string
    totalPeriods: number
    matriz: number
    materias: Materia[] = []
    users: User[] = []

    constructor(id: number) {
        this.id = id
        this.name = ""
        this.campus = ""
        this.totalPeriods = 0.0
        this.matriz = 0
    }
}
