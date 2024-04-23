const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", function connection(ws) {
    console.log("Nova conexão WebSocket estabelecida")

    ws.on("message", function incoming(message) {
        console.log("Mensagem recebida:", message)
        // Processar a mensagem recebida aqui
    })

    ws.on("close", function close() {
        console.log("Conexão WebSocket fechada")
    })
})

console.log("Servidor WebSocket está rodando na porta 8080")
