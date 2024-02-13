import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on('open', () => {
  ws.send("hello");
});

ws.on('error', console.error);