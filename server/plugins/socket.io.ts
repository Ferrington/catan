import { Server as Engine } from "engine.io";
import { stripGameState } from "~/server/game/state";
import { io } from "~/server/utils/socket.io";

export default defineNitroPlugin((nitroApp) => {
  const engine = new Engine();

  io.bind(engine);

  io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);
    console.log("total connections", (await io.fetchSockets()).length);

    socket.on("disconnect", async () => {
      console.log("a user disconnected", socket.id);
      console.log("total connections", (await io.fetchSockets()).length);
    });

    socket.emit("gameState", stripGameState(socket.id));
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
