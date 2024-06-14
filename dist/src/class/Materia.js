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
exports.Materia = exports.materia_inclusions = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
exports.materia_inclusions = client_1.Prisma.validator()({
    prerequisites: true,
    requiredBy: true,
    course: true,
    trilha: true,
    student: true,
});
class Materia {
    constructor(materiaPrisma) {
        this.id = 0;
        this.code = "";
        this.name = "";
        this.totalHours = 0;
        this.period = 0;
        this.periodRequire = null;
        this.prerequisites = [];
        this.requiredBy = [];
        this.course = null;
        this.trilha = {};
        this.student = null;
        if (materiaPrisma) {
            this.load(materiaPrisma);
        }
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materia_prisma = yield prisma_1.prisma.materia.create({
                    data: {
                        code: data.code,
                        name: data.name,
                        totalHours: data.totalHours,
                        period: data.period,
                        periodRequire: data.periodRequire,
                        prerequisites: data.prerequisites
                            ? { connect: data.prerequisites.map((prerequisite) => ({ id: prerequisite.id })) }
                            : undefined,
                        requiredBy: data.requiredBy
                            ? { connect: data.requiredBy.map((required) => ({ id: required.id })) }
                            : undefined,
                        course: data.course ? { connect: { id: data.course.id } } : undefined,
                        trilha: { connect: { id: data.trilha.id } },
                        student: data.student ? { connect: { id: data.student.id } } : undefined,
                    },
                    include: exports.materia_inclusions,
                });
                return new Materia(materia_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao cadastrar matéria");
            }
        });
    }
    static updateMateria(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materia_prisma = yield prisma_1.prisma.materia.update({
                    where: { id: data.id },
                    data: {
                        code: data.code,
                        name: data.name,
                        totalHours: data.totalHours,
                        period: data.period,
                        periodRequire: data.periodRequire,
                        prerequisites: data.prerequisites
                            ? { connect: data.prerequisites.map((prerequisite) => ({ id: prerequisite.id })) }
                            : undefined,
                        requiredBy: data.requiredBy
                            ? { connect: data.requiredBy.map((required) => ({ id: required.id })) }
                            : undefined,
                        course: data.course ? { connect: { id: data.course.id } } : undefined,
                        trilha: data.trilha ? { connect: { id: data.trilha.id } } : undefined,
                    },
                    include: exports.materia_inclusions,
                });
                return new Materia(materia_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao atualizar matéria");
            }
        });
    }
    load(data) {
        this.id = data.id;
        this.code = data.code;
        this.name = data.name;
        this.totalHours = data.totalHours;
        this.period = data.period;
        this.periodRequire = data.periodRequire;
        this.course = data.course;
        this.student = data.student;
    }
}
exports.Materia = Materia;
