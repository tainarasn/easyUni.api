import { Admin, Prisma, Student } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"
import { LoginForm } from "../types/shared/login"

export const userInclusions = Prisma.validator<Prisma.UserInclude>()({
    student: {
        include: {
            user: true,
            atividades: true,
            course: { include: { materias: true, trilhas: true } },
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
    isAdmin: boolean

    constructor(userPrisma?: UserPrisma) {
        this.id = 0
        this.name = ""
        this.email = ""
        this.image = null
        this.username = ""
        this.password = ""
        this.student = null
        this.admin = null
        this.isAdmin = false
        this.student = null

        if (userPrisma) this.load(userPrisma)
    }

    static async signup(data: UserForm) {
        try {
            const user_prisma = await prisma.user.create({
                data: {
                    ...data,
                    student: data.student
                        ? {
                              create: {
                                  period: data.student.period,
                                  courseId: data.student.courseId,
                              },
                          }
                        : undefined,
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
            const user = await prisma.user.findFirst({
                where: {
                    AND: [{ username: data.code }, { password: data.password }],
                },
                include: userInclusions,
            })

            if (!user) {
                throw new Error("Invalid username or password")
            }

            console.log(user)
            return user
        } catch (error) {
            console.error(error)
            throw new Error("Erro ao realizar login")
        }
    }

    static async update(data: PartialUser) {
        try {
            const user_update = await prisma.user.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    image: data.image,
                    username: data.username,
                    isAdmin: data.isAdmin,
                    admin: data.admin ? { update: { ...data.admin } } : undefined,
                    student: data.student
                        ? {
                              update: {
                                  period: data.student.period,
                                  //   courseId: data.student.courseId,
                                  //   materiasCursadas: {
                                  //       connect: data.student.materiasCursadas?.map((materiaId) => ({
                                  //           id: materiaId,
                                  //       })),
                                  //   },
                              },
                          }
                        : undefined,
                },
                include: userInclusions,
            })

            const user = new User(user_update)
            return user
        } catch (error) {
            console.error(error)
            throw new Error("Erro ao atualizar usuário")
        }
    }

    static async list() {
        try {
            const user = await prisma.user.findMany({ include: userInclusions })

            return user
        } catch (error) {
            console.log(error)
            throw new Error("Error ao buscar todas as cursos")
        }
    }

    static async delete(id: number) {
        try {
            const user = await prisma.user.delete({ where: { id: id } })
            return user
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar matéria")
        }
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
        this.isAdmin = data.isAdmin
    }
}
