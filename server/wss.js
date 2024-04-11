import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const clients = new Set(); // Use Set to store connected clients

wss.on('connection', (ws) => {
  console.log('New connection established');
  ws.on('error', console.error);

  clients.add(ws); // Add connected client to the set

  ws.on('message', (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    console.log('Received drawing data:', data);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); 
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws); // Remove disconnected client from the set
  });
});
