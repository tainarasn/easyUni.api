"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userIncludes = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
const Course_1 = require("./Course");
exports.userIncludes = client_1.Prisma.validator()({
    course: { include: Course_1.courseIncludes },
});
class User {
    constructor(id, user) {
        this.id = 0;
        this.name = "";
        this.birth = "";
        this.image = null;
        this.username = "";
        this.email = "";
        this.password = "";
        this.courseId = 0;
        this.course = null;
        user ? this.dataUser(user) : (this.id = id);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({ where: { id: this.id }, include: exports.userIncludes });
            if (user) {
                this.dataUser(user);
            }
            else {
                throw "Usuário não encontrado";
            }
        });
    }
    static updateUser(data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User(data.id);
            yield user.init();
            yield user.updateUser(data, socket);
        });
    }
    dataUser(data) {
        this.id = data.id;
        this.name = data.name;
        this.birth = data.birth;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.image = data.image;
        this.courseId = data.courseId;
        this.course = data.course;
    }
    static login(data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = yield prisma_1.prisma.user.findFirst({
                where: { OR: [{ email: data.code }, { username: data.code }], password: data.password },
                include: exports.userIncludes,
            });
            console.log(userLogin);
            if (userLogin) {
                const user = new User(userLogin.id, userLogin);
                socket === null || socket === void 0 ? void 0 : socket.emit("user:login", user);
                return user;
            }
            else {
                socket === null || socket === void 0 ? void 0 : socket.emit("user:login", null);
            }
            return null;
        });
    }
    static signup(data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findFirst({
                    where: { OR: [{ id: data.id, email: data.email, username: data.username }] },
                });
                if (user) {
                    console.log("Usuário já existe");
                }
                else {
                    let courseInput;
                    if (data.course) {
                        courseInput = {
                            connect: {
                                id: data.course.id,
                            },
                        };
                    }
                    const userCreate = yield prisma_1.prisma.user.create({
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
                        include: exports.userIncludes,
                    });
                    const user = new User(userCreate.id);
                    user.dataUser(userCreate);
                    socket === null || socket === void 0 ? void 0 : socket.emit("user:signup", user);
                    return user;
                }
            }
            catch (error) {
                socket === null || socket === void 0 ? void 0 : socket.emit("user:signup:error", error);
                console.log(error);
            }
        });
    }
    updateUser(data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Crie um objeto para armazenar os dados de atualização
                const dataToUpdate = {};
                if (data.name !== undefined) {
                    dataToUpdate.name = data.name;
                }
                if (data.birth !== undefined) {
                    dataToUpdate.birth = data.birth;
                }
                if (data.email !== undefined) {
                    dataToUpdate.email = data.email;
                }
                if (data.username !== undefined) {
                    dataToUpdate.username = data.username;
                }
                if (data.password !== undefined) {
                    dataToUpdate.password = data.password;
                }
                if (data.image !== null) {
                    dataToUpdate.image = data.image;
                }
                // Realize a atualização no Prisma
                const userUpdate = yield prisma_1.prisma.user.update({
                    where: { id: this.id },
                    data: dataToUpdate,
                    include: exports.userIncludes,
                });
                if (socket) {
                    socket.emit("user:update", userUpdate);
                    socket.emit("user:update:success");
                    console.log("user:update");
                }
                return userUpdate;
            }
            catch (error) {
                console.error("Erro ao atualizar usuário:", error);
                throw error;
            }
        });
    }
    static list(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findMany({ include: exports.userIncludes });
            socket.emit("user:list", users);
        });
    }
}
exports.User = User;
