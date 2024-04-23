import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import { Socket } from "socket.io"
import { LoginForm } from "../types/shared/login"
import { PartialUser, User } from "../class/User"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
    return io
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export const handleSocket = (socket: Socket) => {
    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", (reason) => {
        console.log(`disconnected: ${socket.id}`)
    })

    socket.on("user:signup", (data: User) => User.signup(data, socket))
    socket.on("user:list", () => User.list(socket))
    socket.on("user:login", (data: LoginForm) => User.login(data, socket))
    socket.on("user:update", (data: PartialUser) => User.updateUser(data, socket))
}

export default { initializeIoServer, getIoInstance, handleSocket }
