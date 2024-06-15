//This allows node.js to use the required packages
const WebSocket = require("ws");

//If using a local node.js server it automatically use port 8080, but if using a render server it uses the render port.
const port = process.env.PORT || 8080;

//Create a WebSocket server and listen for connections on the chosen port.
const wss = new WebSocket.Server({ port });

//This activates upon the connection event from the websocket client
wss.on("connection", (ws) => {
   console.log("A new client connected!");

   //This activates upon the message event from the websocket client
   ws.on("message", (message) => {
      console.log(`Received: ${message}`);

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
         if (client.readyState === WebSocket.OPEN) {
            client.send(`${message}`);
         }
      });
   });

   //This activates upon the close event from the websocket client
   ws.on("close", () => {
      console.log("Client disconnected");
   });
});

//This just logs whatever port the websocket server is on in the terminal (Both Localhost and Render servers)
console.log(`WebSocket server is running on port ${port}`);
