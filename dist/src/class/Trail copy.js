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
exports.Trail = exports.trail_inclusions = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
exports.trail_inclusions = client_1.Prisma.validator()({
    materias: true,
    course: true,
});
class Trail {
    constructor(trailPrisma) {
        this.id = 0;
        this.code = "";
        this.name = null;
        this.materias = [];
        this.courseId = null;
        this.course = null;
        if (trailPrisma) {
            this.load(trailPrisma);
        }
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trail_prisma = yield prisma_1.prisma.trail.create({
                    data: {
                        name: data.name,
                        code: data.code,
                        courseId: data.courseId ? data.courseId : 0,
                        materias: {
                            connect: data.materias.map((materia) => ({
                                id: materia.id,
                            })),
                        },
                    },
                    include: exports.trail_inclusions,
                });
                return new Trail(trail_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao cadastrar trilha");
            }
        });
    }
    static update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const trail_prisma = yield prisma_1.prisma.trail.update({
                    where: { id: data.id },
                    data: {
                        name: data.name,
                        code: data.code,
                        courseId: data.courseId ? data.courseId : 0,
                        materias: {
                            connect: (_a = data.materias) === null || _a === void 0 ? void 0 : _a.map((materia) => ({
                                id: materia.id,
                            })),
                        },
                    },
                    include: exports.trail_inclusions,
                });
                return new Trail(trail_prisma);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao atualizar trilha");
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trails = yield prisma_1.prisma.trail.findMany({ include: exports.trail_inclusions });
                return trails;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao buscar todas as trilhas");
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trail = yield prisma_1.prisma.trail.delete({ where: { id } });
                return trail;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao deletar trilha");
            }
        });
    }
    load(data) {
        this.id = data.id;
        this.code = data.code || "";
        this.name = data.name || null;
        this.courseId = data.courseId || null;
        this.materias = data.materias || [];
    }
}
exports.Trail = Trail;
