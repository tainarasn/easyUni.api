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
exports.Course = exports.course_inclusions = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
exports.course_inclusions = client_1.Prisma.validator()({
    materias: { include: { prerequisites: true, requiredBy: true } },
    students: { include: { user: true } },
    trilhas: { include: { materias: true } },
});
class Course {
    //init class
    constructor(coursePrisma) {
        this.id = 0;
        this.name = "";
        this.campus = "";
        this.totalPeriods = 0.0;
        this.totalHoursActivites = 0.0;
        this.matriz = 0;
        this.materias = [];
        this.trilhas = [];
        this.students = [];
        if (coursePrisma) {
            this.load(coursePrisma);
        }
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course_prisma = yield prisma_1.prisma.course.create({
                    data: {
                        name: data.name,
                        campus: data.campus,
                        totalPeriods: data.totalPeriods,
                        materias: data.materias ? { create: data.materias.map((materia) => (Object.assign({}, materia))) } : undefined,
                        trilhas: data.trilhas ? { create: data.trilhas.map((trilha) => (Object.assign({}, trilha))) } : undefined,
                        students: data.students ? { create: data.students.map((student) => (Object.assign({}, student))) } : undefined,
                    },
                    include: exports.course_inclusions,
                });
                const course = new Course(course_prisma);
                return course;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao cadastrar curso");
            }
        });
    }
    static updateCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course_prisma = yield prisma_1.prisma.course.update({
                    where: { id: data.id },
                    data: {
                        name: data.name,
                        campus: data.campus,
                        matriz: data.matriz,
                        totalPeriods: data.totalPeriods,
                        totalHoursActivites: data.totalHoursActivites,
                    },
                    include: exports.course_inclusions,
                });
                return new Course(course_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao atualizar Curso");
            }
        });
    }
    load(data) {
        this.id = data.id;
        this.name = data.name || "";
        this.campus = data.campus || "";
        this.totalPeriods = data.totalPeriods || 0;
        this.totalHoursActivites = data.totalHoursActivites || 0.0;
        this.matriz = data.matriz || 0;
        this.materias = data.materias || [];
        this.trilhas = data.trilhas || [];
        this.students = data.students || [];
    }
}
exports.Course = Course;
