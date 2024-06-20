export type ServerToClientEvents = {
  gameState: (gameState: ClientGameState) => void;
  roll: (roll: Dice) => void;
};

export type ClientToServerEvents = {
  roll: () => void;
};

export type InterServerEvents = {};

export type SocketData = {};
