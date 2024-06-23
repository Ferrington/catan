import { Server as Engine } from "engine.io";
import { registerHandlers } from "~~/server/game/registerHandlers";
import { initializeGame } from "~~/server/game/state";
import { io } from "~~/server/utils/socket.io";

export default defineNitroPlugin((nitroApp) => {
  initializeGame(4);

  const engine = new Engine();

  io.bind(engine);

  io.on("connection", registerHandlers);

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
