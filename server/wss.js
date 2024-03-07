import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});

const users = new Array(0);

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log(data.toString());
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})