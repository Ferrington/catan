export async function onDisconnect(socketId: string) {
  console.log("a user disconnected", socketId);
  console.log("total connections", (await io.fetchSockets()).length);
}
