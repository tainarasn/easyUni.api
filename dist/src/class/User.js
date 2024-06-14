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
            course: { include: { materias: true, students: true, trilhas: true } },
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
        if (userPrisma)
            this.load(userPrisma);
    }
    static signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_prisma = yield prisma_1.prisma.user.create({
                    data: Object.assign(Object.assign({}, data), { student: data.student ? { create: Object.assign({}, data.student) } : undefined, admin: data.admin ? { create: Object.assign({}, data.admin) } : undefined }),
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
    }
}
exports.User = User;
