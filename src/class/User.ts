import { Admin, Prisma, Student } from "@prisma/client"

export const user_include = Prisma.validator<Prisma.UserInclude>()({
    student: {
        include: {
            user: true,
            course: { include: { materias: true, atividades: true, students: true, trilhas: true } },
        },
    },
    admin: { include: { user: true } },
})
export type UserPrisma = Prisma.UserGetPayload<{ include: typeof user_include }>

export class User {
    id: number
    name: string
    email: string
    image: string | null
    username: string
    password: string
    student: Student | null
    admin: Admin | null

    constructor(id: number, userPrisma?: UserPrisma) {
        this.id = id
        this.name = ""
        this.email = ""
        this.image = null
        this.username = ""
        this.password = ""
        this.student = null
        this.admin = null

        if (userPrisma) this.load(userPrisma)
    }

    load(data: UserPrisma) {
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.image = data.image
        this.username = data.username
        this.email = data.email
        this.password = data.password
        this.student = data.student
        this.admin = data.admin
    }
}
