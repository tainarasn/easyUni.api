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
const User_1 = require("../../class/User");
const router = express_1.default.Router();
router.patch("/update", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    console.log(data);
    try {
        const user = yield User_1.User.update(data);
        response.json(user);
    }
    catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield User_1.User.list();
        res.json(course);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar materias");
    }
}));
router.get("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query.id;
    try {
        if (data) {
            const course = yield User_1.User.delete(Number(data));
            res.json(course);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar matéria");
    }
}));
router.post("/addMateria", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (data) {
            const course = yield User_1.User.addMateria(data);
            res.json(course);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao associar matéria a estudante");
    }
}));
exports.default = router;
