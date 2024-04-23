"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.courseIncludes = void 0;
const client_1 = require("@prisma/client");
exports.courseIncludes = client_1.Prisma.validator()({
    materias: { include: { prerequisites: true, requiredBy: true } },
});
class Course {
    constructor(id) {
        this.materias = [];
        this.users = [];
        this.id = id;
        this.name = "";
        this.campus = "";
        this.totalPeriods = 0.0;
        this.matriz = 0;
    }
}
exports.Course = Course;
