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
exports.Activity = exports.activity_inclusions = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
exports.activity_inclusions = client_1.Prisma.validator()({
    student: true,
});
class Activity {
    constructor(activityPrisma) {
        this.id = 0;
        this.name = "";
        this.totalHours = "";
        this.linkCertificate = "";
        this.student = null;
        this.studentId = null;
        if (activityPrisma) {
            this.load(activityPrisma);
        }
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity_prisma = yield prisma_1.prisma.activity.create({
                    data: {
                        name: data.name,
                        totalHours: data.totalHours,
                        linkCertificate: data.linkCertificate,
                        studentId: data.studentId,
                    },
                    include: exports.activity_inclusions,
                });
                return new Activity(activity_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao cadastrar atividade");
            }
        });
    }
    static update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity_prisma = yield prisma_1.prisma.activity.update({
                    where: { id: data.id },
                    data: {
                        name: data.name,
                        totalHours: data.totalHours,
                        linkCertificate: data.linkCertificate,
                        studentId: data.studentId !== undefined ? data.studentId : undefined,
                    },
                    include: exports.activity_inclusions,
                });
                return new Activity(activity_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao atualizar atividade");
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield prisma_1.prisma.activity.findMany({ include: exports.activity_inclusions });
                return activities.map((activity) => new Activity(activity));
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao buscar todas as atividades");
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = yield prisma_1.prisma.activity.delete({ where: { id } });
                return activity;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao deletar atividade");
            }
        });
    }
    load(data) {
        this.id = data.id;
        this.name = data.name || "";
        this.totalHours = data.totalHours || "";
        this.linkCertificate = data.linkCertificate || "";
        this.student = data.student || null;
        this.studentId = data.studentId !== undefined ? data.studentId : null;
    }
}
exports.Activity = Activity;
