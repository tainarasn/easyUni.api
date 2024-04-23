import { Course, Prisma } from "@prisma/client"
import { prisma } from "../prisma"
import { courseIncludes } from "./Course"
import { Socket } from "socket.io"
import { LoginForm } from "../types/shared/login"

export const userIncludes = Prisma.validator<Prisma.UserInclude>()({
    course: { include: courseIncludes },
})

export type UserPrisma = Prisma.UserGetPayload<{ include: typeof userIncludes }>

export type PartialUser = Partial<User> & { id: string }

export class User {
    id: number = 0
    name: string = ""
    birth: string = ""
    image: string | null = null
    username: string = ""
    email: string = ""
    password: string = ""
    courseId: number = 0
    course: Course | null = null

    constructor(id: number, user?: UserPrisma) {
        user ? this.dataUser(user) : (this.id = id)
    }

    async init() {
        const user = await prisma.user.findUnique({ where: { id: this.id }, include: userIncludes })

        if (user) {
            this.dataUser(user)
        } else {
            throw "Usuário não encontrado"
        }
    }

    static async updateUser(data: PartialUser, socket: Socket) {
        const user = new User(data.id)
        await user.init()
        await user.updateUser(data, socket)
    }

    dataUser(data: UserPrisma) {
        this.id = data.id
        this.name = data.name
        this.birth = data.birth
        this.email = data.email
        this.username = data.username
        this.password = data.password
        this.image = data.image
        this.courseId = data.courseId
        this.course = data.course
    }

    static async login(data: LoginForm, socket?: Socket) {
        const userLogin = await prisma.user.findFirst({
            where: { OR: [{ email: data.code }, { username: data.code }], password: data.password },
            include: userIncludes,
        })

        console.log(userLogin)

        if (userLogin) {
            const user = new User(userLogin.id, userLogin)

            socket?.emit("user:login", user)
            return user
        } else {
            socket?.emit("user:login", null)
        }
        return null
    }

    static async signup(data: User, socket?: Socket) {
        try {
            const user = await prisma.user.findFirst({
                where: { OR: [{ id: data.id, email: data.email, username: data.username }] },
            })

            if (user) {
                console.log("Usuário já existe")
            } else {
                let courseInput
                if (data.course) {
                    courseInput = {
                        connect: {
                            id: data.course.id,
                        },
                    }
                }
                const userCreate = await prisma.user.create({
                    data: {
                        name: data.name,
                        birth: data.birth,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        image: "",
                        // course: data.course ? { connect: { id: data.course.id } } : undefined,
                        courseId: data.courseId,
                    },
                    include: userIncludes,
                })

                const user = new User(userCreate.id)
                user.dataUser(userCreate)

                socket?.emit("user:signup", user)
                return user
            }
        } catch (error) {
            socket?.emit("user:signup:error", error)
            console.log(error)
        }
    }

    async updateUser(data: Partial<User>, socket?: Socket) {
        try {
            // Crie um objeto para armazenar os dados de atualização
            const dataToUpdate: Prisma.UserUpdateInput = {}

            if (data.name !== undefined) {
                dataToUpdate.name = data.name
            }
            if (data.birth !== undefined) {
                dataToUpdate.birth = data.birth
            }
            if (data.email !== undefined) {
                dataToUpdate.email = data.email
            }
            if (data.username !== undefined) {
                dataToUpdate.username = data.username
            }
            if (data.password !== undefined) {
                dataToUpdate.password = data.password
            }
            if (data.image !== null) {
                dataToUpdate.image = data.image
            }

            // Realize a atualização no Prisma
            const userUpdate = await prisma.user.update({
                where: { id: this.id },
                data: dataToUpdate,
                include: userIncludes,
            })

            if (socket) {
                socket.emit("user:update", userUpdate)
                socket.emit("user:update:success")

                console.log("user:update")
            }
            return userUpdate
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
            throw error
        }
    }

    static async list(socket: Socket) {
        const users = await prisma.user.findMany({ include: userIncludes })

        socket.emit("user:list", users)
    }
}
