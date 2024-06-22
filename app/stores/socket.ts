import { defineStore } from "pinia";
import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "~~/types/socket";

export const useSocketStore = defineStore("socket", () => {
  const socket = shallowRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io({
      autoConnect: false,
    })
  );

  function connect(clientId: number) {
    socket.value.io.opts.query = {
      clientId,
    };
    socket.value.connect();
  }

  return {
    socket,
    connect,
  };
});
