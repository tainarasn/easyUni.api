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
router.post("/new", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    try {
        console.log(data);
        const user = new User_1.User();
        response.json(user);
    }
    catch (error) {
        console.log(error);
    }
}));
// router.get("/", async (request: Request, response: Response) => {
//     const id = request.query.id as number
//     try {
//         const user = new User(id)
//         await user.init()
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })
// router.patch("/", async (request: Request, response: Response) => {
//     const data = request.body as PartialUser
//     console.log(data)
//     try {
//         const user = new User(data.id)
//         await user.init()
//         await user.updateUser(data)
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//         response.status(500).json(error)
//     }
// })
// router.delete("/", async (request: Request, response: Response) => {
//     const data = request.body as { id: number }
//     try {
//         await prisma.user.delete({ where: { id: data.id } })
//         response.status(200).send()
//     } catch (error) {
//         console.log(error)
//         response.status(500).send(error)
//     }
// })
// export default router
