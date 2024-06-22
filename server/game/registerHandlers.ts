import { Socket } from "socket.io";
import { onDisconnect } from "~~/server/game/handlers/disconnect";
import { onRoll } from "~~/server/game/handlers/roll";
import { gameState, stripGameState } from "~~/server/game/state";
import { ClientToServerEvents, ServerToClientEvents } from "~~/types/socket";

export async function registerHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  const clientId = Number(socket.handshake.query.clientId);

  if (socket.recovered) {
    console.log("recovered socket", socket.id);
    console.log("total connections", (await io.fetchSockets()).length);
  } else {
    gameState.socketAssignments[clientId - 1] = socket.id;
    console.log("a user connected", socket.id);
    console.log("total connections", (await io.fetchSockets()).length);
  }
  socket.emit("gameState", stripGameState(socket.id));

  socket.on("disconnect", async () => await onDisconnect(socket.id));

  socket.on("roll", onRoll);
}
