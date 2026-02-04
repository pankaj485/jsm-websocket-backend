import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

// basic server setup
wss.on("connection", (socket, request) => {
  const ipAddr = request.socket.remoteAddress;
  console.log("connected with ", ipAddr);

  socket.on("message", (bufferData) => {
    const data = bufferData.toString();

    wss.clients.forEach((client) => {
      const isConnectionOpen = client.readyState === WebSocket.OPEN;
      if (isConnectionOpen) {
        const response = JSON.stringify({ user_message: data });
        client.send(response);
      }
    });
  });

  socket.on("error", () => {
    console.log("Error on socket. Client address: ", ipAddr);
  });

  socket.on("close", () => {
    console.log("Connection closed with Client address: ", ipAddr);
  });
});

console.log(`Websocket server running on PORT: ${PORT}`);
