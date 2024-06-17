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
const Activity_1 = require("../../class/Activity");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const activity = yield Activity_1.Activity.create(data);
        res.json(activity);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar matéria");
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield Activity_1.Activity.list();
        res.json(activities);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar activitys");
    }
}));
router.patch("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const activity = yield Activity_1.Activity.update(data);
        res.json(activity);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar matéria");
    }
}));
router.get("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query.id;
    try {
        if (data) {
            const activity = yield Activity_1.Activity.delete(Number(data));
            res.json(activity);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar matéria");
    }
}));
exports.default = router;
