import { Socket } from "socket.io";
import { onDisconnect } from "~~/server/game/handlers/disconnect";
import { onRoll } from "~~/server/game/handlers/roll";
import {
  broadcastGameState,
  setPlayerTurn,
  setSocketAssignment,
  setTurnPhase,
} from "~~/server/game/state";
import { ClientToServerEvents, ServerToClientEvents } from "~~/types/socket";

export async function registerHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) {
  if (socket.handshake.query.clientId == null) {
    // debug
    console.log("a debug tool connected", socket.id);

    socket.on("setPlayerTurn", setPlayerTurn);
    socket.on("setTurnPhase", setTurnPhase);

    socket.on("disconnect", () => console.log("a debug tool disconnected"));

    return;
  }

  const clientId = Number(socket.handshake.query.clientId);

  if (socket.recovered) {
    console.log("recovered socket", socket.id);
  } else {
    setSocketAssignment(clientId, socket.id);
    console.log("a user connected", socket.id);
  }
  broadcastGameState(socket);

  socket.on("disconnect", async () => await onDisconnect(socket.id));

  socket.on("roll", () => onRoll(socket.id));
}
