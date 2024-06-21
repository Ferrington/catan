import { Server as Engine } from "engine.io";
import { gameState, stripGameState } from "~~/server/game/state";
import { io } from "~~/server/utils/socket.io";

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine();

  io.bind(engine);

  io.on("connection", async (socket) => {
    gameState.socketAssignments.push(socket.id);
    socket.emit("gameState", stripGameState(socket.id));

    console.log("a user connected", socket.id);
    console.log("total connections", (await io.fetchSockets()).length);

    socket.on("disconnect", async () => {
      gameState.socketAssignments = gameState.socketAssignments.filter(
        (id) => id !== socket.id
      );
      console.log("a user disconnected", socket.id);
      console.log("total connections", (await io.fetchSockets()).length);
    });

    socket.on("roll", () => {
      const roll: Dice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      console.log(roll);
      io.emit("roll", roll);
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          engine.onWebSocket(req, rawSocket, websocket);
        },
      },
    })
  );
});
