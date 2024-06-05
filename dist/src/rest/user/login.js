"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post("/", async (request: Request, response: Response) => {
//     const data = request.body as LoginForm
//     console.log(data)
//     try {
//         const user = await User.login(data)
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })
// router.post("/keep_session", async (request: Request, response: Response) => {
//     const data = request.body as User
//     console.log(data)
//     try {
//         const user = new User(data.id)
//         await user.init()
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.json(null)
//     }
// })
// router.post("/admin", async (request: Request, response: Response) => {
//     const data = request.body as LoginForm
//     try {
//         const admin = await User.login({ ...data,  })
//         response.json(admin)
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })
exports.default = router;
