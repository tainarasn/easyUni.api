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
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    console.log(data);
    try {
        const user = yield User_1.User.login(data);
        response.json(user);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}));
router.post("/keep_session", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    console.log(data);
    try {
        const user = new User_1.User(data.id);
        yield user.init();
        response.json(user);
    }
    catch (error) {
        console.log(error);
        response.json(null);
    }
}));
router.post("/admin", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    try {
        const admin = yield User_1.User.login(Object.assign({}, data));
        response.json(admin);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
}));
exports.default = router;
