"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocket = exports.getIoInstance = exports.initializeIoServer = void 0;
const socket_io_1 = require("socket.io");
const User_1 = require("../class/User");
let io = null;
const initializeIoServer = (server) => {
    io = new socket_io_1.Server(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 });
    return io;
};
exports.initializeIoServer = initializeIoServer;
const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.");
    }
    return io;
};
exports.getIoInstance = getIoInstance;
const handleSocket = (socket) => {
    console.log(`new connection: ${socket.id}`);
    socket.on("disconnect", (reason) => {
        console.log(`disconnected: ${socket.id}`);
    });
    socket.on("user:signup", (data) => User_1.User.signup(data, socket));
    socket.on("user:list", () => User_1.User.list(socket));
    socket.on("user:login", (data) => User_1.User.login(data, socket));
    socket.on("user:update", (data) => User_1.User.updateUser(data, socket));
};
exports.handleSocket = handleSocket;
exports.default = { initializeIoServer: exports.initializeIoServer, getIoInstance: exports.getIoInstance, handleSocket: exports.handleSocket };
