"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./src/rest/user/login"));
const signup_1 = __importDefault(require("./src/rest/user/signup"));
const course_1 = __importDefault(require("./src/rest/course/course"));
const materia_1 = __importDefault(require("./src/rest/course/materia"));
const user_1 = __importDefault(require("./src/rest/user/user"));
exports.router = express_1.default.Router();
exports.router.get("/", (req, response) => {
    response.status(200).json({ success: true });
});
exports.router.use("/login", login_1.default);
exports.router.use("/signup", signup_1.default);
exports.router.use("/user", user_1.default);
exports.router.use("/course", course_1.default);
exports.router.use("/materia", materia_1.default);
exports.default = exports.router;
