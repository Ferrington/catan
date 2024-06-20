import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "~/types/socket";

export const io = new Server<ClientToServerEvents, ServerToClientEvents>();
