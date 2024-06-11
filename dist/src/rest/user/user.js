"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post("/new", async (request: Request, response: Response) => {
//     const data = request.body as UserForm
//     try {
//         console.log(data)
//         const user = await User.signup(data)
//         user.i
//         response.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// })
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
