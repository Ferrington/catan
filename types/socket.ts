export type ServerToClientEvents = {
  gameState: (gameState: ClientGameState) => void;
  "action:new": (action: LogEntry) => void;
  "action:all": (actions: LogEntry[]) => void;
  "turn:advance": (turn: number, turnPhase: TurnPhase) => void;
};

export type ClientToServerEvents = {
  roll: () => void;

  // debug
  setPlayerTurn: (playerColor: PlayerColor) => void;
  setTurnPhase: (turnPhase: TurnPhase) => void;
};

export type InterServerEvents = {};

export type SocketData = {};
