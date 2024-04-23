"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia = exports.materiaIncludes = void 0;
const client_1 = require("@prisma/client");
const Course_1 = require("./Course");
exports.materiaIncludes = client_1.Prisma.validator()({
    course: { include: Course_1.courseIncludes },
    prerequisites: true,
    requiredBy: true,
});
class Materia {
    constructor(id, course, courseId = 0) {
        this.courseId = 0;
        // Relação muitos-para-muitos consigo mesmo para pré-requisitos
        this.prerequisites = [];
        this.requiredBy = [];
        this.id = id;
        this.code = "";
        this.name = "";
        this.totalHours = 0;
        this.period = 0.0;
        this.course = course;
        this.courseId = courseId;
    }
}
exports.Materia = Materia;
