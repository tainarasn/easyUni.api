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
exports.User = exports.userInclusions = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
exports.userInclusions = client_1.Prisma.validator()({
    student: {
        include: {
            user: true,
            atividades: true,
            course: { include: { materias: true, trilhas: true } },
        },
    },
    admin: { include: { user: true } },
});
class User {
    constructor(userPrisma) {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.image = null;
        this.username = "";
        this.password = "";
        this.student = null;
        this.admin = null;
        this.isAdmin = false;
        this.student = null;
        if (userPrisma)
            this.load(userPrisma);
    }
    static signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_prisma = yield prisma_1.prisma.user.create({
                    data: Object.assign(Object.assign({}, data), { student: data.student
                            ? {
                                create: {
                                    period: data.student.period,
                                    courseId: data.student.courseId,
                                },
                            }
                            : undefined, admin: data.admin ? { create: Object.assign({}, data.admin) } : undefined }),
                    include: exports.userInclusions,
                });
                const user = new User(user_prisma);
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao criar usuário");
            }
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findFirst({
                    where: {
                        AND: [{ username: data.code }, { password: data.password }],
                    },
                    include: exports.userInclusions,
                });
                if (!user) {
                    throw new Error("Invalid username or password");
                }
                console.log(user);
                return user;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao realizar login");
            }
        });
    }
    static update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_update = yield prisma_1.prisma.user.update({
                    where: { id: data.id },
                    data: {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        image: data.image,
                        username: data.username,
                        isAdmin: data.isAdmin,
                        admin: data.admin ? { update: Object.assign({}, data.admin) } : undefined,
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
                    include: exports.userInclusions,
                });
                const user = new User(user_update);
                return user;
            }
            catch (error) {
                console.error(error);
                throw new Error("Erro ao atualizar usuário");
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findMany({ include: exports.userInclusions });
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error ao buscar todas as cursos");
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.delete({ where: { id: id } });
                return user;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao atualizar matéria");
            }
        });
    }
    load(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.image = data.image;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.student = data.student;
        this.admin = data.admin;
        this.isAdmin = data.isAdmin;
    }
}
exports.User = User;
