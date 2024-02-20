import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});

const users = new Array(0);

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log(data);
  });
});