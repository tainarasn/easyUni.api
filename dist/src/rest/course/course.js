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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_1 = require("../../class/Course");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const course = yield Course_1.Course.create(data);
        res.json(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar Curso");
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.Course.list();
        res.json(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar materias");
    }
}));
router.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const course = yield Course_1.Course.updateCourse(data);
        res.json(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar Curso");
    }
}));
router.get("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query.id;
    try {
        if (data) {
            const course = yield Course_1.Course.delete(Number(data));
            res.json(course);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar matéria");
    }
}));
exports.default = router;
