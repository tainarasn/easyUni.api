import { Admin, Prisma, Student } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"
import { LoginForm } from "../types/shared/login"

export const userInclusions = Prisma.validator<Prisma.UserInclude>()({
    student: {
        include: {
            user: true,
            atividades: true,
            course: { include: { materias: true, students: true, trilhas: true } },
        },
    },
    admin: { include: { user: true } },
})

//prisma table
export type UserPrisma = Prisma.UserGetPayload<{ include: typeof userInclusions }>

//front-end types
export type UserForm = Omit<WithoutFunctions<User>, "id">

//update user type
export type PartialUser = Partial<User> & { id: number }

export class User {
    id: number
    name: string
    email: string
    image: string | null
    username: string
    password: string
    student: Student | null
    admin: Admin | null

    constructor(userPrisma?: UserPrisma) {
        this.id = 0
        this.name = ""
        this.email = ""
        this.image = null
        this.username = ""
        this.password = ""
        this.student = null
        this.admin = null

        if (userPrisma) this.load(userPrisma)
    }

    static async signup(data: UserForm) {
        try {
            const user_prisma = await prisma.user.create({
                data: {
                    ...data,
                    student: data.student ? { create: { ...data.student } } : undefined,
                    admin: data.admin ? { create: { ...data.admin } } : undefined,
                },
                include: userInclusions,
            })

            const user = new User(user_prisma)
            return user
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao criar usuário")
        }
    }

    static async login(data: LoginForm) {
        try {
            const user = await prisma.user.findUnique({ where: { username: data.code, AND: { password: data.password } } })
            return user
        } catch (error) {}
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
